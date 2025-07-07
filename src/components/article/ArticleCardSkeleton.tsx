// components/ArticleCardSkeleton.tsx
import React from "react";

const ArticleCardSkeleton: React.FC = () => (
	<article className='bg-white rounded-2xl border border-gray-200 p-6'>
		<div className='flex justify-between items-start mb-4'>
			<div className='flex items-center gap-2'>
				<div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse'></div>
				<div className='w-16 h-3 bg-gray-200 rounded animate-pulse'></div>
			</div>
			<div className='w-5 h-5 bg-gray-200 rounded animate-pulse'></div>
		</div>
		<div className='space-y-2 mb-4'>
			<div className='w-full h-5 bg-gray-200 rounded animate-pulse'></div>
			<div className='w-3/4 h-5 bg-gray-200 rounded animate-pulse'></div>
		</div>
		<div className='flex gap-2 mb-4'>
			<div className='w-16 h-6 bg-gray-200 rounded-full animate-pulse'></div>
			<div className='w-20 h-6 bg-gray-200 rounded-full animate-pulse'></div>
		</div>
		<div className='w-24 h-4 bg-gray-200 rounded animate-pulse mb-4'></div>
		<div className='flex gap-2'>
			<div className='flex-1 h-10 bg-gray-200 rounded-lg animate-pulse'></div>
			<div className='flex-1 h-10 bg-gray-200 rounded-lg animate-pulse'></div>
		</div>
	</article>
);

export default ArticleCardSkeleton;
