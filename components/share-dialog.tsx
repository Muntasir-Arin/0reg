"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share } from 'lucide-react'
import { toast } from "sonner"

export function ShareDialog() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    toast.success("Link copied to clipboard")
    setTimeout(() => setCopied(null), 2000)
  }

  const editableLink = "https://schedule-builder.com/edit/abc123"
  const viewOnlyLink = "https://schedule-builder.com/view/abc123"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share schedule</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label>Editable link</Label>
            <div className="flex space-x-2">
              <Input
                value={editableLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => handleCopy(editableLink, 'editable')}
              >
                {copied === 'editable' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>View-only link</Label>
            <div className="flex space-x-2">
              <Input
                value={viewOnlyLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => handleCopy(viewOnlyLink, 'viewOnly')}
              >
                {copied === 'viewOnly' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

