import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { processVideo, fetchMyVideos } from '../utils/api';
import '../App.css';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>("");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoList, setVideoList] = useState<string[]>([]);

    useEffect(() => {
        const loadVideos = async () => {
            const token = localStorage.getItem('jwt_token');
            if (!token || token === 'null' || token === 'undefined') {
                return;
            }

            try {
                const urls = await fetchMyVideos();
                setVideoList(urls);
                if (urls.length > 0) {
                    setVideoUrl(urls[0]);
                }
            } catch (err) {
                console.error("Could not load video library", err);
            }
        };
        loadVideos();
    }, []);

    const handleProcess = async (actionType: 'compress' | 'proxy' | 'audio' | 'silence_trim') => {
        if (!videoFile) {
            setStatus("Please select a video first");
            return;
        }

        setStatus(`Processing video (${actionType})...`);
        setVideoUrl(null);

        try {
            const resultUrl = await processVideo(videoFile, actionType);
            setVideoUrl(resultUrl);
            setVideoList(prev => [resultUrl, ...prev]);
            setStatus(`Processing complete for target: ${actionType}!`);
        } catch (err) {
            setStatus(err instanceof Error ? err.message : "Error processing file");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Video Creator Toolkit</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white font-medium rounded-lg text-sm hover:bg-red-500 transition-colors"
                    >
                        Log Out
                    </button>
                </div>

                <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Upload Video & Select Feature</h3>

                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                    />

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => handleProcess('silence_trim')}
                            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg text-sm hover:bg-purple-500 transition-colors shadow-sm"
                        >
                            🎬 Auto Jump-Cut (Silence Trim)
                        </button>

                        <button
                            onClick={() => handleProcess('proxy')}
                            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-500 transition-colors"
                        >
                            Create Proxy (480p)
                        </button>

                        <button
                            onClick={() => handleProcess('compress')}
                            className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg text-sm hover:bg-emerald-500 transition-colors"
                        >
                            Compress Media
                        </button>

                        <button
                            onClick={() => handleProcess('audio')}
                            className="px-4 py-2 bg-amber-600 text-white font-medium rounded-lg text-sm hover:bg-amber-500 transition-colors"
                        >
                            Extract MP3 Audio
                        </button>
                    </div>

                    {status && (
                        <p className="mt-4 text-sm text-gray-700 font-medium">{status}</p>
                    )}
                </div>

                {videoUrl && (
                    <div className="mt-8 border border-gray-200 rounded-xl p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Preview Output</h3>
                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-inner flex items-center justify-center">
                            {videoUrl.includes('.mp3') ? (
                                <audio src={videoUrl} controls className="w-full px-6" />
                            ) : (
                                <video
                                    key={videoUrl}
                                    src={videoUrl}
                                    controls
                                    className="w-full h-full object-contain"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                )}

                {videoList.length > 0 && (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Project History Library</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {videoList.map((url, index) => (
                                <div
                                    key={index}
                                    onClick={() => setVideoUrl(url)}
                                    className={`cursor-pointer group relative aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 transition-all ${videoUrl === url ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent hover:border-gray-400'}`}
                                >
                                    {url.includes('.mp3') ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-amber-800 p-4">
                                            <span className="font-bold text-sm text-center">Audio Record Track</span>
                                            <span className="text-xs text-amber-600">Click to preview audio</span>
                                        </div>
                                    ) : (
                                        <video src={url} className="w-full h-full object-cover pointer-events-none opacity-80 group-hover:opacity-100" />
                                    )}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white/90 text-gray-900 text-xs font-semibold px-2.5 py-1.5 rounded shadow">Click to Play</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;