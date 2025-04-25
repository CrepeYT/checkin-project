import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const Howtouse = () => {
    return (
        // อันนี้ปุ่มวิธีใช้งาน
        <div className="text-purple-600 text-xs p-1 border-1 rounded-lg border-purple-500 hover:bg-purple-500 hover:text-white ">
            <Popover>
                <PopoverTrigger>วิธีใช้งาน</PopoverTrigger>
                <PopoverContent>ไอควยยยยยยยหน้าโง่ชอบหาย</PopoverContent>
            </Popover>

        </div>
    )
}

export default Howtouse