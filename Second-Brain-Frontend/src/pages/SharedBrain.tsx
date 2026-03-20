import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import { Card } from '../components/ui/Card'
import { Sidebar } from '../components/ui/Sidebar'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function SharedBrain() {
    const { shareLink } = useParams<{ shareLink: string }>();
    const [content, setContent] = useState<any[]>([]);
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSharedContent = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
                setContent(response.data.content || []);
                setUsername(response.data.username || '');
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load shared brain");
            } finally {
                setLoading(false);
            }
        };

        if (shareLink) {
            fetchSharedContent();
        }
    }, [shareLink]);

    return (
        <div>
            <Sidebar/>
            <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
                {loading ? (
                    <div className="flex justify-center items-center pt-8">
                        <div className="text-gray-500">Loading shared brain...</div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center pt-8">
                        <div className="text-red-500">{error}</div>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {username}'s Brain
                            </h1>
                        </div>
                        <div className='flex flex-wrap gap-6 pt-4'>
                            {content.length === 0 ? (
                                <div className="text-gray-500 text-center w-full pt-8">
                                    No content to display.
                                </div>
                            ) : (
                                content.map((item) => (
                                    <Card 
                                        key={item._id} 
                                        type={item.type} 
                                        link={item.link} 
                                        title={item.title}
                                        contentId={item._id}
                                    />
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

