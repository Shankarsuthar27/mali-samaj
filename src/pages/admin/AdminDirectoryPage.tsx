import React from 'react';
import { DirectorySection } from '../../components/DirectorySection';

export const AdminDirectoryPage: React.FC = () => {
  return (
    <div className="space-y-6 font-devanagari">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white">पब्लिक डायरेक्टरी लाइव पूर्वावलोकन (Directory Preview)</h2>
          <p className="text-xs text-slate-400">यह लाइव पब्लिक डायरेक्टरी व्यू है जिसमें केवल स्वीकृत (Approved) सदस्य प्रदर्शित होते हैं।</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
        <DirectorySection />
      </div>
    </div>
  );
};
