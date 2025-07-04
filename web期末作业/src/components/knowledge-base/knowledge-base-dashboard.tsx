'use client';

import { useState } from 'react';
import { KnowledgeBaseList, CreateKnowledgeBaseForm, FileUpload, DocumentList, FAQList, CreateFAQForm, EditFAQForm } from './index';
import EditKnowledgeBaseForm from './edit-knowledge-base-form';
import type { KnowledgeBase, FAQ } from '@/types/knowledge-base';

interface KnowledgeBaseDashboardProps {
  apiKey: string;
}

export default function KnowledgeBaseDashboard({ apiKey }: KnowledgeBaseDashboardProps) {
  const [selectedKb, setSelectedKb] = useState<KnowledgeBase | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingKb, setEditingKb] = useState<KnowledgeBase | null>(null);
  const [activeTab, setActiveTab] = useState<'documents' | 'upload' | 'faqs'>('faqs');
  
  // FAQ相关状态
  const [showCreateFAQForm, setShowCreateFAQForm] = useState(false);
  const [showEditFAQForm, setShowEditFAQForm] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  const handleSelectKb = (kb: KnowledgeBase) => {
    setSelectedKb(kb);
    setActiveTab('documents');
  };

  const handleCreateSuccess = (kbId: string) => {
    setShowCreateForm(false);
    // 可以选择自动选中新创建的知识库
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleEditSuccess = () => {
    setShowEditForm(false);
    setEditingKb(null);
    // 刷新会自动发生，因为 hook 中调用了 fetchKnowledgeBaseList
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setEditingKb(null);
  };

  // FAQ相关处理函数
  const handleCreateFAQSuccess = () => {
    setShowCreateFAQForm(false);
    // 创建成功后确保用户能看到新创建的FAQ
    console.log('FAQ创建成功，切换回列表视图');
  };

  const handleCreateFAQCancel = () => {
    setShowCreateFAQForm(false);
  };

  const handleEditFAQSuccess = () => {
    setShowEditFAQForm(false);
    setEditingFAQ(null);
    // 编辑成功后确保用户能看到更新后的FAQ
    console.log('FAQ编辑成功，切换回列表视图');
  };

  const handleEditFAQCancel = () => {
    setShowEditFAQForm(false);
    setEditingFAQ(null);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setShowEditFAQForm(true);
    setShowCreateFAQForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">知识库管理</h1>
        <p className="mt-2 text-green-700">管理您的知识库、文档和FAQ</p>
      </div>

      <div className="space-y-8">
        {/* 上部：知识库列表 */}
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-green-800">知识库列表</h2>
          </div>
          {showCreateForm ? (
            <CreateKnowledgeBaseForm
              apiKey={apiKey}
              onSuccess={handleCreateSuccess}
              onCancel={handleCreateCancel}
            />
          ) : showEditForm && editingKb ? (
            <EditKnowledgeBaseForm
              apiKey={apiKey}
              knowledgeBase={editingKb}
              onSuccess={handleEditSuccess}
              onCancel={handleEditCancel}
            />
          ) : (
            <KnowledgeBaseList
              apiKey={apiKey}
              onSelectKb={handleSelectKb}
              onCreateKb={() => {
                setShowCreateForm(true);
                setShowEditForm(false); // 确保编辑表单关闭
              }}
              onDeleteKb={() => {
                // 如果删除的是当前选中的知识库，清空选择
                if (selectedKb) {
                  setSelectedKb(null);
                }
              }}
              onEditKb={(kb) => {
                setEditingKb(kb);
                setShowEditForm(true);
                setShowCreateForm(false); // 确保创建表单关闭
              }}
            />
          )}
        </div>

        {/* 下部：知识库详情 */}
        <div>
          {selectedKb ? (
            <div className="bg-green-50 rounded-lg border border-green-200">
              {/* 知识库信息头部 */}
              <div className="p-6 border-b border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-green-800">
                      {selectedKb.kbName}
                    </h2>
                    {selectedKb.createTime && (
                      <p className="text-xs text-gray-400 mt-1">
                        创建时间: {new Date(selectedKb.createTime).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedKb(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 标签页导航 */}
              <div className="border-b border-green-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => {
                      setActiveTab('faqs');
                      setShowCreateFAQForm(false);
                      setShowEditFAQForm(false);
                    }}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'faqs'
                        ? 'border-green-600 text-green-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🙋 问答管理
                  </button>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'upload'
                        ? 'border-green-600 text-green-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📤 上传文档
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'documents'
                        ? 'border-green-600 text-green-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📂 文档管理
                  </button>
                </nav>
              </div>

              {/* 标签页内容 */}
              <div className="p-6">
                {activeTab === 'documents' && (
                  <DocumentList
                    apiKey={apiKey}
                    kbId={selectedKb.kbId}
                    onDeleteSuccess={() => {
                      // 可以添加删除成功后的处理
                    }}
                  />
                )}
                
                {activeTab === 'upload' && (
                  <FileUpload
                    apiKey={apiKey}
                    kbId={selectedKb.kbId}
                    onUploadSuccess={() => {
                      // 上传成功后切换到文档列表
                      setActiveTab('documents');
                    }}
                  />
                )}

                {activeTab === 'faqs' && (
                  <>
                    {showCreateFAQForm ? (
                      <CreateFAQForm
                        apiKey={apiKey}
                        kbId={selectedKb.kbId}
                        onSuccess={handleCreateFAQSuccess}
                        onCancel={handleCreateFAQCancel}
                      />
                    ) : showEditFAQForm && editingFAQ ? (
                      <EditFAQForm
                        apiKey={apiKey}
                        kbId={selectedKb.kbId}
                        faq={editingFAQ}
                        onSuccess={handleEditFAQSuccess}
                        onCancel={handleEditFAQCancel}
                      />
                    ) : (
                      <FAQList
                        apiKey={apiKey}
                        kbId={selectedKb.kbId}
                        onCreateFAQ={() => {
                          setShowCreateFAQForm(true);
                          setShowEditFAQForm(false);
                        }}
                        onEditFAQ={handleEditFAQ}
                        onDeleteSuccess={() => {
                          // FAQ删除成功后的处理
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg border border-green-200 p-12 text-center">
              <div className="mx-auto w-16 h-16 text-green-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-800 mb-2">选择知识库</h3>
              <p className="text-green-600">
                从上方列表中选择一个知识库来管理文档和FAQ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}