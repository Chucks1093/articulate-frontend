import React, { Fragment } from "react";
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
	{
		title: "Priority Processing",
		subtitle:
			"Get your translations processed faster with dedicated resources.",
		freeIncluded: false,
		proIncluded: true,
		enterpriseIncluded: true,
	},
	{
		title: "Custom Terminology",
		subtitle:
			"Upload glossaries and maintain consistent translations for your industry.",
		freeIncluded: false,
		proIncluded: false,
		enterpriseIncluded: true,
	},
	{
		title: "API Access",
		subtitle:
			"Integrate Articulate directly into your workflow with our powerful API.",
		freeIncluded: false,
		proIncluded: false,
		enterpriseIncluded: true,
	},
	{
		title: "Team Collaboration",
		subtitle:
			"Share translations with your team and manage multiple user accounts.",
		freeIncluded: false,
		proIncluded: false,
		enterpriseIncluded: true,
	},
];

const FreePlanIcon: React.FC = () => (
	<div className='rounded-lg bg-gray-100 flex items-center justify-center p-2'>
		<FileText
			strokeWidth='1.5'
			size={32}
			className='text-gray-600'
		/>
	</div>
);

const ProPlanIcon: React.FC = () => (
	<div className='rounded-lg bg-blue-100 flex items-center justify-center p-2'>
		<Globe
			strokeWidth='1.5'
			size={32}
			className='text-blue-600'
		/>
	</div>
);

const EnterprisePlanIcon: React.FC = () => (
	<div className='rounded-lg bg-purple-100 flex items-center justify-center p-2'>
		<Zap
			strokeWidth='1.5'
			size={32}
			className='text-purple-600'
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
	buttonStyle = "border bg-gray-100",
	index,
	quota,
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
				className={`relative border rounded-lg p-6 shadow-sm transition-all hover:shadow-md bg-white ${
					isPopular ? "border-blue-500 bg-blue-50/30" : "border-gray-200"
				}`}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25, delay: index * 0.1 }}
				whileHover={{ y: -5 }}>
				{isPopular && (
					<motion.div
						className='absolute -top-3 left-1/2 transform -translate-x-1/2'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}>
						<span className='bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium'>
							Most Popular
						</span>
					</motion.div>
				)}

				<div className='flex items-center justify-between'>
					<Icon />
					<div className='flex items-center gap-2'>
						{originalPrice && (
							<p className='font-grotesk font-medium text-lg text-gray-400 line-through'>
								${originalPrice}
							</p>
						)}
						<p className='font-grotesk font-semibold text-2xl'>
							{price === "Free" ? "Free" : `$${price}`}
						</p>
					</div>
				</div>

				<div className='my-6'>
					<div className='flex gap-2 items-center justify-between'>
						<h2 className='text-2xl font-grotesk font-semibold'>
							{title}
						</h2>
						<p className='text-gray-500 rounded-md text-sm py-1'>
							{period}
						</p>
					</div>

					<p className='mt-2 text-sm text-blue-600 font-medium'>{quota}</p>
					<p className='mt-4 text-gray-600 text-md'>{description}</p>
				</div>

				<hr className='border-dashed border-gray-400' />

				<motion.button
					onClick={async () => {
						await attach({ productId: "pro" });
					}}
					className={`flex items-center justify-center gap-3 w-full my-6 py-3 rounded-xl font-grotesk font-semibold transition-all ${
						isPopular
							? "bg-blue-500 text-white hover:bg-blue-600"
							: buttonStyle + " hover:bg-gray-200"
					}`}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}>
					{buttonText} <MoveRight size={18} />
				</motion.button>

				<div>
					<h2 className='font-grotesk text-gray-700 font-medium mb-4'>
						Features Included:
					</h2>
					<div className='space-y-1'>
						{allFeatures.map((feature: Feature, featureIndex: number) => {
							const isIncluded = getFeatureIncluded(feature);
							const isLastFeature =
								allFeatures.length == featureIndex + 1;
							return (
								<motion.div
									className={`flex items-center justify-between gap-2 py-3 ${
										!isLastFeature && "border-b-gray-100 border-b"
									}`}
									key={featureIndex}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										duration: 0.4,
									}}>
									<div
										className={`w-5 h-5 rounded-md flex items-center justify-center p-1 ${
											isIncluded ? "bg-blue-400" : "bg-gray-200"
										}`}>
										{isIncluded ? (
											<Check
												className='text-white'
												strokeWidth='3'
												size={12}
											/>
										) : (
											<X
												className='text-gray-500'
												strokeWidth='3'
												size={12}
											/>
										)}
									</div>
									<p
										className={`mr-auto font-grotesk ${
											isIncluded ? "text-gray-700" : "text-gray-400"
										}`}>
										{feature.title}
									</p>

									<Tooltip>
										<TooltipTrigger asChild>
											<Info
												size={18}
												className='text-gray-500 cursor-help hover:text-gray-700 transition-colors'
											/>
										</TooltipTrigger>
										<TooltipContent className='bg-white shadow-lg border rounded-md py-1.5 px-4'>
											<p className='max-w-xs text-gray-600 text-sm'>
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
		<div className=''>
			<AnimatePresence>
				<motion.img
					src='/images/hero-img.svg'
					className='absolute inset-0 h-full w-full object-cover grayscale-[.2] brightness-[.6]  '
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
			<div className='w-full  relative   overflow-hidden h-screen  '>
				<Header />

				<FeatureItem
					code='world'
					title='Global Access'
					description='Unlock worldwide content'
					iconColor='text-blue-600'
					iconBgColor='bg-blue-50'
					className='absolute right-2 top-10 md:top-[20%] h-fit md:right-[4%] z-10 bg-gray-100  border'
				/>

				<FeatureItem
					code='no'
					title='PDF Export'
					description='Beautiful formatted documents'
					iconColor='text-orange-600'
					iconBgColor='bg-orange-50'
					className='absolute md:bottom-20 h-fit md:left-[1%] z-10 bg-white shadow-md bottom-[4px] border'
				/>
			</div>
			<section className='max-w-7xl mx-auto flex flex-col items-center  px-4 py-[15vh] absolute inset-0 '>
				<h1 className='font-grotesk text-white text-[1.8rem] md:text-[3rem] font-semibold mt-3 text-center z-50'>
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
						price='19'
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
						price='99'
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
					<p className='text-gray-500 text-sm'>
						All plans include access to 20+ languages and PDF generation.
						Cancel anytime.
					</p>
				</motion.div>
			</section>
		</div>
	);
};

export default Pricing;
