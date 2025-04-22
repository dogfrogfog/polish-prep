import { Skeleton } from "@/components/ui/skeleton"

export default function TaskLoading() {
  return (
    <div className="p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-16" />
          </div>
          <Skeleton className="h-9 w-96" />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <Skeleton className="h-7 w-32 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>

          <div className="bg-white border p-6 rounded-lg">
            <Skeleton className="h-7 w-40 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 