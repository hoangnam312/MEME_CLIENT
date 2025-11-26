import { faBug, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router';
import FacebookIcon from 'src/assets/icon/FacebookIcon';
import MainIcon from 'src/assets/icon/MainIcon';
import { Path } from 'src/constants/type';

const ContactUs: React.FC = () => {
	const navigate = useNavigate();
	const contactLinks = [
		{
			icon: (
				<FontAwesomeIcon
					icon={faEnvelope}
					className="mr-1.5 h-5 w-5 md:mr-2 md:h-6 md:w-6"
				/>
			),
			label: t('contactUs.gmail'),
			value: 'memenya.com@gmail.com',
			link: 'mailto:memenya.com@gmail.com',
			bgColor: 'bg-white dark:bg-white/10',
			iconColor: 'text-blue-600 dark:text-blue-400',
			hoverColor: 'hover:bg-gray-50 dark:hover:bg-white/20',
		},
		{
			icon: <FacebookIcon />,
			label: t('contactUs.facebookPage'),
			value: 'https://www.facebook.com/profile.php?id=61583511456661',
			link: 'https://www.facebook.com/profile.php?id=61583511456661',
			bgColor: 'bg-blue-50 dark:bg-blue-900/20',
			iconColor: 'text-blue-600 dark:text-blue-400',
			hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
		},
		{
			icon: <FacebookIcon />,
			label: t('contactUs.facebookPersonal'),
			value: 'https://www.facebook.com/profile.php?id=61583789391045',
			link: 'https://www.facebook.com/profile.php?id=61583789391045',
			bgColor: 'bg-blue-50 dark:bg-blue-900/20',
			iconColor: 'text-blue-600 dark:text-blue-400',
			hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
		},
		{
			icon: (
				<FontAwesomeIcon
					icon={faBug}
					className="mr-1.5 h-5 w-5 md:mr-2 md:h-6 md:w-6"
				/>
			),
			label: t('contactUs.formBug'),
			value: 'https://forms.gle/FUD2jgcTm9t1Nw5Z6',
			link: 'https://forms.gle/FUD2jgcTm9t1Nw5Z6',
			bgColor: 'bg-red-50 dark:bg-red-900/20',
			iconColor: 'text-red-600 dark:text-red-400',
			hoverColor: 'hover:bg-red-100 dark:hover:bg-red-900/30',
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 py-4 md:py-8 dark:bg-gray-900">
			<div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
				<div className="mb-6 flex items-center justify-center md:mb-10">
					<div
						onClick={() => navigate(Path.HOME_PAGE)}
						className="cursor-pointer"
					>
						<MainIcon />
					</div>
				</div>
				{/* Header */}
				<div className="mb-10 text-center md:mb-20">
					<h1 className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white">
						{t('contactUs.title')}
					</h1>
					<p className="mt-1 text-sm text-gray-600 md:mt-2 md:text-lg dark:text-gray-400">
						{t('contactUs.subtitle')}
					</p>
				</div>

				{/* Contact Information Cards */}
				<div className="grid gap-3 md:gap-4">
					{contactLinks.map((contact, index) => (
						<a
							key={index}
							href={contact.link}
							target="_blank"
							rel="noopener noreferrer"
							className={`flex flex-col items-start justify-between gap-2 rounded-lg p-4 shadow-md transition-all duration-200 md:flex-row md:items-center md:gap-0 md:p-6 ${contact.bgColor} ${contact.hoverColor}`}
						>
							<div
								className={`flex items-center justify-start ${contact.iconColor}`}
							>
								{contact.icon}
								<h3 className="text-sm font-semibold text-gray-900 md:text-base dark:text-white">
									{contact.label}
								</h3>
							</div>
							<p className="break-all text-xs text-gray-600 md:break-normal md:text-sm dark:text-gray-300">
								{contact.value}
							</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
