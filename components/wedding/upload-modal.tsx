'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, Camera, Image as ImageIcon, Upload, Loader2, Sparkles } from 'lucide-react'

interface UploadModalProps {
    isOpen: boolean
    onClose: () => void
    onUploadSuccess?: (photoUrl: string, caption: string, sender: string) => void
    code?: string
}

export function UploadModal({ isOpen, onClose, onUploadSuccess, code }: UploadModalProps) {
    const [step, setStep] = useState<'select' | 'camera' | 'preview' | 'uploading'>('select')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [senderName, setSenderName] = useState('')
    const [caption, setCaption] = useState('')
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [progress, setProgress] = useState(0)

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    // Clear state when modal closes
    useEffect(() => {
        if (!isOpen) {
            stopCamera()
            setStep('select')
            setSelectedImage(null)
            setSelectedFile(null)
            setSenderName('')
            setCaption('')
            setProgress(0)
        }
    }, [isOpen])

    // Clean up stream on unmount
    useEffect(() => {
        return () => {
            stopCamera()
        }
    }, [])

    async function startCamera() {
        try {
            setStep('camera')
            setIsCameraActive(true)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false,
            })
            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.play().catch((err) => console.log('Video play error:', err))
            }
        } catch (err) {
            console.error('Error accessing camera:', err)
            alert('Could not access camera. Please select a photo from your gallery instead.')
            setStep('select')
            setIsCameraActive(false)
        }
    }

    function stopCamera() {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }
        setIsCameraActive(false)
    }

    function capturePhoto() {
        if (videoRef.current) {
            const canvas = document.createElement('canvas')
            canvas.width = videoRef.current.videoWidth || 640
            canvas.height = videoRef.current.videoHeight || 480
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.scale(-1, 1) // Mirrored visual match
                ctx.drawImage(videoRef.current, -canvas.width, 0, canvas.width, canvas.height)
                const dataUrl = canvas.toDataURL('image/jpeg')
                setSelectedImage(dataUrl)
                // Convert data URL to File
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
                        setSelectedFile(file)
                    }
                }, 'image/jpeg')
                setStep('preview')
                stopCamera()
            }
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onload = () => {
                setSelectedImage(reader.result as string)
                setStep('preview')
            }
            reader.readAsDataURL(file)
        }
    }

    async function handleUpload() {
        if (!selectedImage || !selectedFile || !code) return
        setStep('uploading')
        setProgress(0)

        try {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('caption', caption || 'Shared a lovely moment!')
            formData.append('sender', senderName || 'Anonymous Guest')

            const res = await fetch(`/api/invite/${code}/upload`, {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                const errData = await res.json()
                alert(errData.error || 'Upload failed')
                setStep('preview')
                return
            }

            const media = await res.json()
            setProgress(100)

            // Trigger success callback
            if (onUploadSuccess) {
                onUploadSuccess(
                    media.url,
                    media.caption || 'Shared a lovely moment!',
                    media.sender_name || 'Anonymous Guest'
                )
            }

            setTimeout(() => {
                onClose()
            }, 600)
        } catch (err) {
            console.error('Upload error:', err)
            alert('Upload failed. Please try again.')
            setStep('preview')
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/30 bg-card p-6 shadow-2xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-gold animate-pulse" />
                        <h3 className="font-serif text-xl text-gold">Share a Moment</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-gold/20 bg-background/40 p-1.5 text-muted-foreground transition-colors hover:text-gold"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content Stages */}
                {step === 'select' && (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <p className="mb-6 font-sans text-sm text-muted-foreground">
                            Capture a photo live or upload one in celebration!
                        </p>
                        <div className="grid w-full grid-cols-2 gap-4">
                            <button
                                onClick={startCamera}
                                className="flex flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-background/50 p-5 font-sans transition-all hover:border-gold hover:bg-gold/10"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                                    <Camera className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-medium text-foreground">Take Photo</span>
                            </button>

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-background/50 p-5 font-sans transition-all hover:border-gold hover:bg-gold/10"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                                    <ImageIcon className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-medium text-foreground">Upload File</span>
                            </button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                )}

                {step === 'camera' && (
                    <div className="flex flex-col items-center">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/20 bg-black">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="h-full w-full object-cover scale-x-[-1]"
                            />
                        </div>
                        <div className="mt-4 flex w-full justify-between gap-3">
                            <button
                                onClick={() => {
                                    stopCamera()
                                    setStep('select')
                                }}
                                className="flex-1 rounded-full border border-gold/20 py-2.5 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={capturePhoto}
                                className="flex-1 rounded-full bg-gold py-2.5 font-sans text-sm font-medium text-background transition-opacity hover:opacity-90"
                            >
                                Capture
                            </button>
                        </div>
                    </div>
                )}

                {step === 'preview' && selectedImage && (
                    <div className="flex flex-col">
                        <div className="relative max-h-48 w-full overflow-hidden rounded-2xl border border-gold/20 bg-background/50">
                            <img
                                src={selectedImage}
                                alt="Upload preview"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="mt-4 space-y-3">
                            <input
                                type="text"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                placeholder="Your Name (e.g. Aunt Miriam)"
                                className="w-full rounded-xl border border-gold/25 bg-background/60 px-4 py-2.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                            />
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Add a nice note/wish..."
                                rows={2}
                                className="w-full resize-none rounded-xl border border-gold/25 bg-background/60 px-4 py-2.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                            />

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setSelectedImage(null)
                                        setSelectedFile(null)
                                        setStep('select')
                                    }}
                                    className="flex-1 rounded-full border border-gold/20 py-2.5 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={!senderName.trim() || !code}
                                    className="flex-1 rounded-full bg-gold py-2.5 font-sans text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                    Upload Photo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'uploading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="mb-4 h-10 w-10 animate-spin text-gold" />
                        <h4 className="font-serif text-lg text-gold">Uploading...</h4>
                        <div className="mt-4 h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-background border border-gold/10">
                            <div
                                className="h-full bg-gold transition-all duration-150 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="mt-2 font-sans text-xs text-muted-foreground">{progress}% Complete</span>
                    </div>
                )}
            </div>
        </div>
    )
}