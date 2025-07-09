
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  Settings, 
  Users, 
  Share, 
  MessageSquare,
  MoreVertical,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from "lucide-react";

interface VideoCallInterfaceProps {
  isActive: boolean;
  onEndCall: () => void;
  isEmbedded?: boolean;
}

const VideoCallInterface: React.FC<VideoCallInterfaceProps> = ({ 
  isActive, 
  onEndCall, 
  isEmbedded = false 
}) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isActive) return null;

  // Fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/80 text-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Interview Session</h2>
            <Badge variant="outline" className="border-green-500 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live
            </Badge>
            <div className="text-sm text-gray-300">
              Duration: {formatDuration(callDuration)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`text-sm ${getConnectionColor(connectionQuality)}`}>
              ● {connectionQuality} connection
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Minimize className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Interviewer Video */}
          <Card className="relative bg-gray-900 border-gray-700 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              {videoEnabled ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="h-16 w-16 text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-white">
                  <VideoOff className="h-16 w-16 mb-4" />
                  <p>Camera Off</p>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Badge className="bg-black/70 text-white">Interviewer</Badge>
              {!micEnabled && <MicOff className="h-4 w-4 text-red-500" />}
            </div>
            <div className="absolute top-4 right-4">
              <div className="flex space-x-1">
                <div className="w-2 h-6 bg-green-500 rounded"></div>
                <div className="w-2 h-4 bg-green-500 rounded"></div>
                <div className="w-2 h-3 bg-green-500 rounded"></div>
              </div>
            </div>
          </Card>

          {/* Candidate Video */}
          <Card className="relative bg-gray-900 border-gray-700 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Badge className="bg-black/70 text-white">Candidate</Badge>
            </div>
            <div className="absolute top-4 right-4">
              <div className="flex space-x-1">
                <div className="w-2 h-6 bg-green-500 rounded"></div>
                <div className="w-2 h-5 bg-green-500 rounded"></div>
                <div className="w-2 h-4 bg-green-500 rounded"></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="bg-black/90 p-6 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <Button
              variant={micEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={() => setMicEnabled(!micEnabled)}
              className="rounded-full h-14 w-14"
            >
              {micEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
            
            <Button
              variant={videoEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={() => setVideoEnabled(!videoEnabled)}
              className="rounded-full h-14 w-14"
            >
              {videoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>

            <Button
              variant={speakerEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={() => setSpeakerEnabled(!speakerEnabled)}
              className="rounded-full h-14 w-14"
            >
              {speakerEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-14 w-14"
            >
              <Share className="h-6 w-6" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-14 w-14"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={onEndCall}
              className="rounded-full h-14 w-14 bg-red-600 hover:bg-red-700"
            >
              <Phone className="h-6 w-6" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-14 w-14"
            >
              <MoreVertical className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Embedded mode
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <h3 className="text-sm font-semibold text-foreground">Video Call</h3>
          <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
            Live
          </Badge>
          <div className="text-xs text-muted-foreground">
            {formatDuration(callDuration)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`text-xs ${getConnectionColor(connectionQuality)}`}>
            ● {connectionQuality}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 w-8 p-0"
          >
            <Maximize className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Compact Video Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Interviewer Video */}
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden aspect-video">
          {videoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <VideoOff className="h-6 w-6 mb-1" />
              <p className="text-xs">Camera Off</p>
            </div>
          )}
          <div className="absolute bottom-1 left-1">
            <Badge className="bg-black/70 text-white text-xs">Interviewer</Badge>
          </div>
          <div className="absolute top-1 right-1">
            <div className="flex space-x-0.5">
              <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
              <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-1 h-1.5 bg-green-500 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Candidate Video */}
        <div className="relative bg-gradient-to-br from-green-900 to-green-700 rounded-lg overflow-hidden aspect-video">
          <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-1 left-1">
            <Badge className="bg-black/70 text-white text-xs">Candidate</Badge>
          </div>
          <div className="absolute top-1 right-1">
            <div className="flex space-x-0.5">
              <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
              <div className="w-1 h-2.5 bg-green-500 rounded-sm"></div>
              <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Controls */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant={micEnabled ? "secondary" : "destructive"}
          size="sm"
          onClick={() => setMicEnabled(!micEnabled)}
          className="rounded-full h-8 w-8 p-0"
        >
          {micEnabled ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
        </Button>
        
        <Button
          variant={videoEnabled ? "secondary" : "destructive"}
          size="sm"
          onClick={() => setVideoEnabled(!videoEnabled)}
          className="rounded-full h-8 w-8 p-0"
        >
          {videoEnabled ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
        </Button>

        <Button
          variant={speakerEnabled ? "secondary" : "destructive"}
          size="sm"
          onClick={() => setSpeakerEnabled(!speakerEnabled)}
          className="rounded-full h-8 w-8 p-0"
        >
          {speakerEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={onEndCall}
          className="rounded-full h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
        >
          <Phone className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCallInterface;
