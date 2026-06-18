import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>("");

    const handleTranscode = async () => {
        if (!videoFile) {
            setStatus("Please select a video first");
            return;
        }

        const formData = new FormData();
        formData.append("file", videoFile);

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/transcode", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Transcoding failed");
            }

            const text = await response.text();
            setStatus(text);
        } catch (err) {
            setStatus(err instanceof Error ? err.message : "Error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Application Workspace</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white font-medium rounded-lg text-sm hover:bg-red-500 transition-colors"
                    >
                        Log Out
                    </button>
                </div>

                {/* Video Transcoder UI */}
                <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Video Transcoder</h3>

                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        className="mb-4"
                    />

                    <button
                        onClick={handleTranscode}
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-500 transition-colors"
                    >
                        Transcode Video
                    </button>

                    {status && (
                        <p className="mt-4 text-sm text-gray-700">{status}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
