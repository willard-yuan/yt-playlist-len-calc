"use client";

import { Card, CardContent, CardHeader } from "./ui/card";

export function PlaylistSkeleton() {
  return (
    <div id="playlist-analysis" className="space-y-8 mx-2">
      {/* Main Analysis Card Skeleton */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 bg-purple-300 rounded animate-pulse" />
            <div className="h-6 w-40 bg-purple-300 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards Skeleton */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-4 bg-gray-300 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
                </div>
                <div className="h-8 w-20 bg-gray-300 rounded animate-pulse mb-1" />
                <div className="h-3 w-24 bg-gray-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video List Skeleton */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-blue-300 rounded animate-pulse" />
              <div className="h-6 w-32 bg-blue-300 rounded animate-pulse" />
            </div>
            <div className="h-8 w-24 bg-blue-300 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Video Items Skeleton */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border">
                {/* Thumbnail */}
                <div className="w-24 h-16 bg-gray-300 rounded animate-pulse flex-shrink-0" />
                
                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
                
                {/* Duration */}
                <div className="h-6 w-12 bg-gray-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
          
          {/* Load More Button Skeleton */}
          <div className="flex justify-center mt-6">
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-green-300 rounded animate-pulse" />
                <div className="h-6 w-36 bg-green-300 rounded animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function LoadingMessage({ step, message }: { step: number; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-purple-600">{step + 1}</span>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-900">{message}</p>
        <div className="flex space-x-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}