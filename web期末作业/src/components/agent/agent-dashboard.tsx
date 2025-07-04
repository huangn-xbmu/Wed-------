"use client";

import { useState, useEffect } from "react";
import { Agent, CreateAgentRequest, UpdateAgentRequest } from "@/types/agent";
import { agentService } from "@/services/agentService";
import { AgentList } from "./agent-list";
import { AgentForm } from "./agent-form";
import { AgentDetail } from "./agent-detail";
import { AgentKbBinding } from "./agent-kb-binding";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/toast";

type ViewMode = "list" | "create" | "edit" | "detail" | "kb-binding";

interface AgentDashboardProps {
  apiKey: string;
}

export function AgentDashboard({ apiKey }: AgentDashboardProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { toasts, removeToast, showSuccess, showError } = useToast();

  useEffect(() => {
    if (apiKey) {
      agentService.setApiKey(apiKey);
      loadAgents();
    }
  }, [apiKey]);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const response = await agentService.getAgentList();
      if (response.success && response.data) {
        // 确保 response.data 是数组
        const agentsData = Array.isArray(response.data) ? response.data : [];
        setAgents(agentsData);
      } else {
        console.error("Failed to load agents:", response.error);
        setAgents([]); // 设置为空数组
        showError(`加载Agent列表失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error loading agents:", error);
      setAgents([]); // 设置为空数组
      showError("加载Agent列表时发生错误");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async (agentData: CreateAgentRequest) => {
    try {
      const response = await agentService.createAgent(agentData);
      if (response.success) {
        showSuccess("Agent创建成功");
        setViewMode("list");
        loadAgents();
      } else {
        showError(`创建Agent失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      showError("创建Agent时发生错误");
    }
  };

  const handleUpdateAgent = async (agentData: UpdateAgentRequest) => {
    try {
      const response = await agentService.updateAgent(agentData);
      if (response.success) {
        showSuccess("Agent更新成功");
        setViewMode("list");
        setSelectedAgent(null);
        loadAgents();
      } else {
        showError(`更新Agent失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      showError("更新Agent时发生错误");
    }
  };

  const handleDeleteAgent = async (uuid: string) => {
    if (!confirm("确定要删除这个Agent吗？")) {
      return;
    }

    try {
      const response = await agentService.deleteAgent({ uuid });
      if (response.success) {
        showSuccess("Agent删除成功");
        loadAgents();
      } else {
        showError(`删除Agent失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      showError("删除Agent时发生错误");
    }
  };

  const handleViewDetail = async (uuid: string) => {
    try {
      const response = await agentService.getAgentDetail(uuid);
      if (response.success && response.data) {
        setSelectedAgent(response.data);
        setViewMode("detail");
      } else {
        showError(`获取Agent详情失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error getting agent detail:", error);
      showError("获取Agent详情时发生错误");
    }
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setViewMode("edit");
  };

  const handleManageKnowledgeBases = (agent: Agent) => {
    setSelectedAgent(agent);
    setViewMode("kb-binding");
  };

  if (!apiKey) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold mb-4 text-green-800">API Key未配置</h2>
        <p className="text-green-700">
          请在环境变量中配置 NEXT_PUBLIC_QANYTHING_API_KEY
        </p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <div className="space-y-8">
      <div className="bg-green-50 rounded-lg border border-green-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Agent管理</h1>
            <p className="mt-2 text-green-700">管理和配置您的AI助手</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {viewMode !== "list" && (
              <button
                onClick={() => {
                  setViewMode("list");
                  setSelectedAgent(null);
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← 返回列表
              </button>
            )}
            {viewMode === "list" && (
              <button
                onClick={() => setViewMode("create")}
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium"
              >
                ✨ 创建Agent
              </button>
            )}
          </div>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <AgentList
            agents={agents}
            loading={loading}
            onEdit={handleEditAgent}
            onDelete={handleDeleteAgent}
            onViewDetail={handleViewDetail}
          />
        </div>
      )}

      {viewMode === "create" && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <AgentForm
            onSubmit={handleCreateAgent}
            onCancel={() => setViewMode("list")}
          />
        </div>
      )}

      {viewMode === "edit" && selectedAgent && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <AgentForm
            agent={selectedAgent}
            onSubmit={handleUpdateAgent}
            onCancel={() => {
              setViewMode("list");
              setSelectedAgent(null);
            }}
            isEditing={true}
          />
        </div>
      )}

      {viewMode === "detail" && selectedAgent && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <AgentDetail
            agent={selectedAgent}
            onClose={() => {
              setViewMode("list");
              setSelectedAgent(null);
            }}
            onEdit={handleEditAgent}
            onManageKnowledgeBases={handleManageKnowledgeBases}
          />
        </div>
      )}

      {viewMode === "kb-binding" && selectedAgent && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <AgentKbBinding
            agent={selectedAgent}
            apiKey={apiKey}
            onClose={() => {
              setViewMode("detail");
            }}
            onSuccess={async () => {
              await loadAgents();
              // 重新获取当前Agent的详情以显示最新的绑定状态
              if (selectedAgent) {
                try {
                  const response = await agentService.getAgentDetail(selectedAgent.uuid);
                  if (response.success && response.data) {
                    setSelectedAgent(response.data);
                    setViewMode("detail");
                  }
                } catch (error) {
                  console.error("Error refreshing agent detail:", error);
                  setViewMode("detail");
                }
              }
            }}
          />
        </div>
      )}
      </div>
    </>
  );
}
