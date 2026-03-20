import { useState, useEffect } from 'react'
import copy from "copy-to-clipboard"
import '../App.css'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import axios from 'axios'
import { BACKEND_URL, FRONTEND_URL } from '../config'


export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [content, setContent] = useState<any[]>([]);

    const fetchContent = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: { "Authorization": localStorage.getItem("token") }
        });
        setContent(response.data.content || []);
    };

    useEffect(() => {
        fetchContent();
    }, []);

return(
    <div>
        <Sidebar/>
        <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => {
            setModalOpen(false);
        }} onSuccess={fetchContent}/>
        <div className='flex justify-end gap-4'>
        <div className='flex gap-4'>
            
        <Button startIcon={<ShareIcon size={"md"}/>} variant="secondary" text="Share Brain" 
        size = "md" onClick={ async() => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share : true
            }, {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            // Extract hash from /api/v1/brain/${hash} format
            const hash = response.data.link?.split('/').pop() || '';
            const shareUrl = `${FRONTEND_URL}brain/${hash}`;
            copy(shareUrl);
        }}></Button>

        <Button startIcon={<PlusIcon size = {"md"}/>} variant="primary" text = "Add Content"
        size="md" onClick={() => {setModalOpen(true)}}/>
        </div>
        </div>

        <div className='flex gap-6 pt-4 flex-wrap'>
            {content.map((item) => (
                <Card key={item._id} type={item.type} link={item.link} title={item.title} contentId={item._id} onDelete={fetchContent}/>
            ))}
        </div>
        </div>
    </div>
    
    
)
  
}
