import { File, FileText } from 'lucide-react'
import React from 'react'


const ToolItem = ({title,desc,link}) =>{
    return (
        <div className='flex flex-col gap-2 items-center w-full sm:w-[200px] bg-slate-200 rounded-md p-3 shadow-sm shadow-slate-500/50'>
            <FileText  size={24} color='#e48500'/>
            <h3 className='font-bold'>{title}</h3>
            <span className='text-center'>{desc}</span>
            <button className='border border-slate-400  w-1/2 sm:w-full rounded-lg bg-orange-300 '>Try it yourself</button>
        </div>
    )
}

const MoreTools = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-evenly gap-4 sm:gap-0'>

        <ToolItem title='Chat PDF' desc='ChatPDF is an AI-powered tool that is designed to make your interaction with PDFs as simple as having a conversation.' />
        <ToolItem title='Chat PDF' desc='ChatPDF is an AI-powered tool that is designed to make your interaction with PDFs as simple as having a conversation.' />
        
    </div>
  )
}

export default MoreTools