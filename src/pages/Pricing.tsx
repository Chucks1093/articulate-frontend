import React from "react";
import { FileText, Check, Info, MoveRight, X, Globe, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import FeatureItem from "@/components/common/FeatureItem";
import Header from "@/components/home/Header";
import { useCustomer } from "autumn-js/react";
import { cn } from "@/lib/utils";
import showToast from "@/utils/toast.utils";

interface Feature {
	title: string;
	subtitle: string;
	freeIncluded: boolean;
	proIncluded: boolean;
	enterpriseIncluded: boolean;
}

type PlanType = "free" | "pro" | "enterprise";

interface PricingCardProps {
	plan: PlanType;
	price: string;
	period: string;
	title: string;
	description: string;
	icon: React.ComponentType;
	isPopular?: boolean;
	originalPrice?: string | null;
	buttonText?: string;
	buttonStyle?: string;
	index: number;
	quota: string;
	className?: string;
}

const allFeatures: Feature[] = [
	{
		title: "Article Translation",
		subtitle:
			"Transform any web article into perfectly formatted content in your target language.",
		freeIncluded: true,
		proIncluded: true,
		enterpriseIncluded: true,
	},
	{
		title: "PDF Generation",
		subtitle:
			"Download beautifully formatted PDFs ready for sharing or offline reading.",
		freeIncluded: true,
		proIncluded: true,
		enterpriseIncluded: true,
	},
	{
		title: "20+ Languages",
		subtitle:
			"Access translations in Spanish, French, German, Japanese, Chinese, and many more.",
		freeIncluded: true,
		proIncluded: true,
		enterpriseIncluded: true,
	},
	{
		title: "Unlimited Articles",
		subtitle:
			"Translate as many articles as you need without worrying about quotas.",
		freeIncluded: false,
		proIncluded: true,
		enterpriseIncluded: true,
	},
];

const FreePlanIcon: React.FC = () => (
	<div className='rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center p-2'>
		<FileText
			strokeWidth='1.5'
			size={32}
			className='text-zinc-300'
		/>
	</div>
);

const ProPlanIcon: React.FC = () => (
	<div className='rounded-lg bg-app-primary/20 border border-app-primary/30 flex items-center justify-center p-2'>
		<Globe
			strokeWidth='1.5'
			size={32}
			className='text-app-primary'
		/>
	</div>
);

const EnterprisePlanIcon: React.FC = () => (
	<div className='rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center p-2'>
		<Zap
			strokeWidth='1.5'
			size={32}
			className='text-purple-400'
		/>
	</div>
);

const PricingCard: React.FC<PricingCardProps> = ({
	plan,
	price,
	period,
	title,
	description,
	icon: Icon,
	isPopular = false,
	originalPrice = null,
	buttonText = "Get Started",
	index,
	quota,
	className,
}) => {
	const { attach } = useCustomer();
	const getFeatureIncluded = (feature: Feature): boolean => {
		switch (plan) {
			case "free":
				return feature.freeIncluded;
			case "pro":
				return feature.proIncluded;
			case "enterprise":
				return feature.enterpriseIncluded;
			default:
				return false;
		}
	};

	return (
		<TooltipProvider>
			<motion.article
				className={cn(
					`relative border rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl bg-zinc-900  ${
						isPopular
							? "border-blue-500 ring-2 ring-blue-500"
							: "border-zinc-700 hover:border-zinc-600"
					} `,
					className
				)}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25, delay: index * 0.1 }}
				whileHover={{ y: -5, scale: 1.02 }}>
				{isPopular && (
					<motion.div
						className='absolute -top-3 left-1/2 transform -translate-x-1/2'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}>
						<span className='bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg font-grotesk'>
							Most Popular
						</span>
					</motion.div>
				)}

				<div className='flex items-center justify-between'>
					<Icon />
					<div className='flex items-center gap-2'>
						{originalPrice && (
							<p className='font-grotesk font-medium text-lg text-zinc-500 line-through'>
								${originalPrice}
							</p>
						)}
						<p className='font-grotesk font-semibold text-2xl text-white'>
							{price === "Free" ? "Free" : `${price}`}
						</p>
					</div>
				</div>

				<div className='my-6'>
					<div className='flex gap-2 items-center justify-between'>
						<h2 className='text-2xl font-grotesk font-semibold text-white'>
							{title}
						</h2>
						<p className='text-zinc-400 rounded-md text-sm py-1 bg-zinc-800 px-2 border border-zinc-700'>
							{period}
						</p>
					</div>

					<p className='mt-2 text-sm text-app-primary font-medium bg-app-primary/10 px-2 py-1 rounded-md inline-block border border-app-primary/30'>
						{quota}
					</p>
					<p className='mt-4 text-zinc-300 text-md'>{description}</p>
				</div>

				<hr className='border-dashed border-zinc-700' />

				<motion.button
					onClick={async () => {
						const res = await attach({ productId: plan });
						if (res.error?.code === "product_already_attached") {
							showToast.success(`User is already on the ${plan} plan`);
						}
					}}
					className={`flex items-center justify-center gap-3 w-full my-6 py-3 rounded-xl font-grotesk font-semibold transition-all ${
						isPopular
							? "bg-blue-500 text-white hover:bg-blue-700 shadow-lg"
							: plan === "enterprise"
								? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg"
								: "bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-white"
					}`}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}>
					{buttonText} <MoveRight size={18} />
				</motion.button>

				<div>
					<h2 className='font-grotesk text-white font-medium mb-4'>
						Features Included:
					</h2>
					<div className='space-y-1'>
						{allFeatures.map((feature: Feature, featureIndex: number) => {
							const isIncluded = getFeatureIncluded(feature);
							const isLastFeature =
								allFeatures.length == featureIndex + 1;
							return (
								<motion.div
									className={`flex items-center justify-between gap-2 py-3 px-2 rounded-lg transition-colors hover:bg-zinc-800/50 ${
										!isLastFeature && "border-b-zinc-800 border-b"
									}`}
									key={featureIndex}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										duration: 0.4,
									}}>
									<div
										className={`w-5 h-5 rounded-md flex items-center justify-center p-1 ${
											isIncluded
												? "bg-app-primary"
												: "bg-zinc-700 border border-zinc-600"
										}`}>
										{isIncluded ? (
											<Check
												className='text-zinc-800'
												strokeWidth='3'
												size={12}
											/>
										) : (
											<X
												className='text-zinc-400'
												strokeWidth='3'
												size={12}
											/>
										)}
									</div>
									<p
										className={`mr-auto font-grotesk ${
											isIncluded ? "text-white" : "text-zinc-500"
										}`}>
										{feature.title}
									</p>

									<Tooltip>
										<TooltipTrigger asChild>
											<div className='p-1 rounded-full hover:bg-zinc-800 transition-colors cursor-help'>
												<Info
													size={18}
													className='text-zinc-500 hover:text-zinc-300 transition-colors'
												/>
											</div>
										</TooltipTrigger>
										<TooltipContent className='bg-zinc-800 text-white shadow-lg border border-zinc-700 rounded-md py-1.5 px-4'>
											<p className='max-w-xs text-zinc-200 text-sm'>
												{feature.subtitle}
											</p>
										</TooltipContent>
									</Tooltip>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.article>
		</TooltipProvider>
	);
};

const Pricing: React.FC = () => {
	return (
		<div className='relative min-h-screen overflow-hidden'>
			{/* Full coverage background image */}
			<div className='absolute inset-0 min-h-full'>
				<AnimatePresence>
					<motion.img
						src='/images/hero-img.svg'
						className='absolute inset-0 w-full h-full min-h-screen object-cover brightness-[.3] '
						style={{ minHeight: "100vh" }}
						initial={{
							opacity: 0,
							scale: 1,
						}}
						animate={{
							opacity: 1,
							scale: 1.1,
						}}
						exit={{
							opacity: 0,
							scale: 1.15,
						}}
						transition={{
							opacity: { duration: 0.5, ease: "easeInOut" },
							scale: { duration: 10, ease: "easeOut" },
						}}
					/>
				</AnimatePresence>
			</div>

			{/* Header and feature items */}
			<div className='relative z-20'>
				<Header />
			</div>

			{/* Main content */}
			<section className='relative z-10 max-w-7xl mx-auto flex flex-col items-center px-4 py-[15vh] min-h-screen'>
				<FeatureItem
					code='world'
					title='Global Access'
					description='Unlock worldwide content'
					iconColor='text-blue-600'
					iconBgColor='bg-blue-50'
					className='absolute right-2 top-48 md:top-[13%] h-fit md:right-[4%] z-10 bg-zinc-800 border border-zinc-700 shadow-lg rounded-lg '
				/>

				<h1 className='font-grotesk text-white text-[1.8rem] md:text-[3rem] font-semibold mt-3 text-center drop-shadow-lg'>
					Pricing
				</h1>

				<div className='grid md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl px-1 md:px-0'>
					<PricingCard
						plan='free'
						price='Free'
						period='Forever'
						title='Starter'
						quota='5 articles per month'
						description='Perfect for trying out Articulate and translating occasional articles.'
						icon={FreePlanIcon}
						buttonText='Start Free'
						index={0}
					/>

					<PricingCard
						plan='pro'
						price='$5'
						period='Per Month'
						title='Professional'
						quota='Unlimited articles'
						description='Complete translation solution for researchers, students, and professionals.'
						icon={ProPlanIcon}
						isPopular={true}
						buttonText='Get Started'
						index={1}
					/>

					<PricingCard
						plan='enterprise'
						price='$55'
						period='Per Month'
						title='Enterprise'
						quota='Unlimited + API access'
						description='Advanced features for teams and organizations that need translation at scale.'
						icon={EnterprisePlanIcon}
						buttonText='Contact Sales'
						buttonStyle='border bg-purple-50 text-purple-700 border-purple-200'
						index={2}
					/>
				</div>

				<motion.div
					className='mt-8 text-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 1.2 }}>
					<p className='text-white/80 text-sm drop-shadow-sm font-grotesk'>
						All plans include access to 20+ languages and PDF generation.
						Cancel anytime.
					</p>
				</motion.div>
			</section>
		</div>
	);
};

export default Pricing;
