import { useState } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
	const [activeSection, setActiveSection] = useState<string>('overview');

	const scrollToSection = (sectionId: string) => {
		setActiveSection(sectionId);
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="privacy-policy-container">
			{/* Navigation Sidebar */}
			<nav className="privacy-nav">
				<div className="nav-header">
					<h3>Privacy Policy</h3>
					<p className="last-updated">Last updated: December 15, 2024</p>
				</div>
				<ul className="nav-links">
					<li>
						<button
							className={activeSection === 'overview' ? 'active' : ''}
							onClick={() => scrollToSection('overview')}
						>
							Overview
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'data-collection' ? 'active' : ''}
							onClick={() => scrollToSection('data-collection')}
						>
							Data Collection
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'gdpr-rights' ? 'active' : ''}
							onClick={() => scrollToSection('gdpr-rights')}
						>
							GDPR Rights
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'ccpa-rights' ? 'active' : ''}
							onClick={() => scrollToSection('ccpa-rights')}
						>
							CCPA/CPRA Rights
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'caloppa' ? 'active' : ''}
							onClick={() => scrollToSection('caloppa')}
						>
							CalOPPA
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'data-retention' ? 'active' : ''}
							onClick={() => scrollToSection('data-retention')}
						>
							Data Retention
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'contact' ? 'active' : ''}
							onClick={() => scrollToSection('contact')}
						>
							Contact Us
						</button>
					</li>
				</ul>
			</nav>

			{/* Main Content */}
			<main className="privacy-content">
				<section id="overview" className="policy-section">
					<h1>Privacy Policy</h1>
					<p className="policy-intro">
						This Privacy Policy describes how Meme nya ("we," "us," or "our")
						collects, uses, and shares your personal information when you use
						our meme sharing platform and related services (the "Service"). This
						policy complies with the General Data Protection Regulation (GDPR),
						California Consumer Privacy Act (CCPA), California Privacy Rights
						Act (CPRA), and California Online Privacy Protection Act (CalOPPA).
					</p>

					<div className="legal-basis-section">
						<h2>Legal Basis for Data Processing (GDPR)</h2>
						<p>
							We process your personal data based on the following legal
							grounds:
						</p>
						<ul>
							<li>
								<strong>Consent:</strong> When you explicitly agree to the
								processing of your personal data for specific purposes.
							</li>
							<li>
								<strong>Contract Performance:</strong> To provide you with our
								services and fulfill our contractual obligations.
							</li>
							<li>
								<strong>Legitimate Interest:</strong> To improve our services,
								prevent fraud, and ensure security.
							</li>
							<li>
								<strong>Legal Obligation:</strong> To comply with applicable
								laws and regulations.
							</li>
						</ul>
					</div>
				</section>

				<section id="data-collection" className="policy-section">
					<h2>Data Collection and Use</h2>

					<div className="data-categories">
						<h3>Categories of Personal Information We Collect</h3>
						<div className="category-grid">
							<div className="category-card">
								<h4>Identifiers</h4>
								<ul>
									<li>Email address</li>
									<li>Username</li>
									<li>IP address</li>
									<li>Device identifiers</li>
								</ul>
							</div>
							<div className="category-card">
								<h4>Personal Information</h4>
								<ul>
									<li>Name</li>
									<li>Profile picture</li>
									<li>Bio information</li>
									<li>Contact information</li>
								</ul>
							</div>
							<div className="category-card">
								<h4>Usage Data</h4>
								<ul>
									<li>Browsing history</li>
									<li>Interaction data</li>
									<li>Search queries</li>
									<li>Content preferences</li>
								</ul>
							</div>
							<div className="category-card">
								<h4>Technical Data</h4>
								<ul>
									<li>Browser type</li>
									<li>Operating system</li>
									<li>Device information</li>
									<li>Performance data</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="business-purposes">
						<h3>Business Purposes for Data Processing</h3>
						<ul>
							<li>
								<strong>Service Provision:</strong> To provide and maintain our
								meme sharing platform
							</li>
							<li>
								<strong>User Experience:</strong> To personalize content and
								improve user experience
							</li>
							<li>
								<strong>Security:</strong> To protect against fraud and ensure
								platform security
							</li>
							<li>
								<strong>Analytics:</strong> To analyze usage patterns and
								improve our services
							</li>
							<li>
								<strong>Communication:</strong> To send important updates and
								notifications
							</li>
							<li>
								<strong>Legal Compliance:</strong> To comply with applicable
								laws and regulations
							</li>
						</ul>
					</div>
				</section>

				<section id="gdpr-rights" className="policy-section">
					<h2>Your GDPR Rights</h2>
					<p>
						If you are located in the European Economic Area (EEA), you have the
						following rights regarding your personal data:
					</p>

					<div className="rights-grid">
						<div className="right-card">
							<h4>Right of Access</h4>
							<p>
								You have the right to request access to your personal data and
								receive information about how we process it.
							</p>
						</div>

						<div className="right-card">
							<h4>Right of Rectification</h4>
							<p>
								You have the right to request correction of inaccurate or
								incomplete personal data.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Erasure</h4>
							<p>
								You have the right to request deletion of your personal data in
								certain circumstances.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Data Portability</h4>
							<p>
								You have the right to receive your personal data in a
								structured, commonly used format.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Restrict Processing</h4>
							<p>
								You have the right to request restriction of processing in
								certain circumstances.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Object</h4>
							<p>
								You have the right to object to processing based on legitimate
								interests.
							</p>
						</div>
					</div>

					<div className="dpo-section">
						<h3>Data Protection Officer</h3>
						<p>
							For GDPR-related inquiries, you may contact our Data Protection
							Officer:
						</p>
						<div className="contact-info">
							<p>
								<strong>Email:</strong> memenya.com@gmail.com
							</p>
						</div>
					</div>
				</section>

				<section id="ccpa-rights" className="policy-section">
					<h2>Your CCPA/CPRA Rights</h2>
					<p>
						If you are a California resident, you have the following rights
						under the CCPA and CPRA:
					</p>

					<div className="ccpa-rights-grid">
						<div className="right-card">
							<h4>Right to Know</h4>
							<p>
								You have the right to know what personal information we collect,
								use, and disclose about you.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Access</h4>
							<p>
								You have the right to access the specific pieces of personal
								information we have about you.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Delete</h4>
							<p>
								You have the right to request deletion of your personal
								information, subject to certain exceptions.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Opt-Out</h4>
							<p>
								You have the right to opt-out of the sale or sharing of your
								personal information.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Correction</h4>
							<p>
								You have the right to request correction of inaccurate personal
								information.
							</p>
						</div>

						<div className="right-card">
							<h4>Right to Limit</h4>
							<p>
								You have the right to limit the use and disclosure of sensitive
								personal information.
							</p>
						</div>
					</div>

					<div className="do-not-sell-section">
						<h3>Do Not Sell My Personal Information</h3>
						<p>
							We do not sell your personal information for monetary
							consideration. However, we may share your information with third
							parties for business purposes. You can opt-out of such sharing:
						</p>
						<div className="opt-out-options">
							<p>
								You can opt-out of data sharing by contacting us at
								memenya.com@gmail.com
							</p>
						</div>
					</div>

					<div className="financial-incentives">
						<h3>Financial Incentives</h3>
						<p>
							We do not offer financial incentives for the collection, sale, or
							deletion of personal information.
						</p>
					</div>
				</section>

				<section id="caloppa" className="policy-section">
					<h2>California Online Privacy Protection Act (CalOPPA)</h2>

					<div className="do-not-track-section">
						<h3>Do Not Track Policy</h3>
						<p>
							Our website does not respond to "Do Not Track" signals from your
							browser. However, you can control tracking through your browser
							settings:
						</p>
						<ul>
							<li>
								<strong>Chrome:</strong> Settings → Privacy and security →
								Cookies and other site data
							</li>
							<li>
								<strong>Firefox:</strong> Options → Privacy & Security →
								Tracking Protection
							</li>
							<li>
								<strong>Safari:</strong> Preferences → Privacy → Website
								tracking
							</li>
							<li>
								<strong>Edge:</strong> Settings → Cookies and site permissions →
								Cookies and site data
							</li>
						</ul>
					</div>

					<div className="tracking-technologies">
						<h3>Online Tracking Technologies</h3>
						<p>We use the following tracking technologies:</p>
						<div className="tracking-grid">
							<div className="tracking-card">
								<h4>Essential Cookies</h4>
								<p>Required for basic website functionality</p>
								<span className="status required">Required</span>
							</div>
							<div className="tracking-card">
								<h4>Analytics Cookies</h4>
								<p>Help us understand how visitors use our site</p>
								<span className="status optional">Optional</span>
							</div>
							<div className="tracking-card">
								<h4>Marketing Cookies</h4>
								<p>Used for personalized advertising</p>
								<span className="status optional">Optional</span>
							</div>
							<div className="tracking-card">
								<h4>Social Media Cookies</h4>
								<p>Enable social media integration</p>
								<span className="status optional">Optional</span>
							</div>
						</div>
					</div>

					<div className="third-party-tracking">
						<h3>Third-Party Tracking Disclosure</h3>
						<p>
							We may work with third-party service providers who use tracking
							technologies on our behalf:
						</p>
						<ul>
							<li>
								<strong>Google Analytics:</strong> Website analytics and
								performance monitoring
							</li>
							<li>
								<strong>Facebook Pixel:</strong> Social media advertising and
								analytics
							</li>
							<li>
								<strong>Google Ads:</strong> Advertising campaign tracking
							</li>
							<li>
								<strong>Hotjar:</strong> User experience analytics
							</li>
						</ul>
					</div>
				</section>

				<section id="data-retention" className="policy-section">
					<h2>Data Retention and Deletion</h2>

					<div className="retention-schedule">
						<h3>Data Retention Schedule</h3>
						<div className="retention-grid">
							<div className="retention-card">
								<h4>Account Data</h4>
								<p>
									<strong>Retention Period:</strong> Until account deletion or 3
									years of inactivity
								</p>
								<p>
									<strong>Deletion Process:</strong> Automated deletion after 3
									years of inactivity
								</p>
							</div>
							<div className="retention-card">
								<h4>Usage Data</h4>
								<p>
									<strong>Retention Period:</strong> 2 years
								</p>
								<p>
									<strong>Deletion Process:</strong> Automated deletion after 2
									years
								</p>
							</div>
							<div className="retention-card">
								<h4>Analytics Data</h4>
								<p>
									<strong>Retention Period:</strong> 1 year
								</p>
								<p>
									<strong>Deletion Process:</strong> Automated deletion after 1
									year
								</p>
							</div>
							<div className="retention-card">
								<h4>Marketing Data</h4>
								<p>
									<strong>Retention Period:</strong> Until opt-out or 2 years
								</p>
								<p>
									<strong>Deletion Process:</strong> Immediate deletion upon
									opt-out
								</p>
							</div>
						</div>
					</div>

					<div className="international-transfers">
						<h3>International Data Transfers</h3>
						<p>
							Your personal data may be transferred to and processed in
							countries outside your residence. We ensure adequate protection
							through:
						</p>
						<ul>
							<li>Standard Contractual Clauses (SCCs) for GDPR compliance</li>
							<li>Adequacy decisions by the European Commission</li>
							<li>Certification schemes and codes of conduct</li>
							<li>Binding corporate rules where applicable</li>
						</ul>
					</div>
				</section>

				<section id="contact" className="policy-section">
					<h2>Contact Information</h2>

					<div className="contact-grid">
						<div className="contact-card">
							<h3>General Privacy Inquiries</h3>
							<p>
								<strong>Email:</strong> memenya.com@gmail.com
							</p>
							<p>
								<strong>Response Time:</strong> Within 30 days
							</p>
						</div>
					</div>

					<div className="complaint-procedures">
						<h3>Complaint Procedures</h3>
						<p>
							If you believe we have not addressed your privacy concerns
							adequately, you may:
						</p>
						<ul>
							<li>
								<strong>GDPR:</strong> Contact your local data protection
								authority
							</li>
							<li>
								<strong>CCPA/CPRA:</strong> Contact the California Attorney
								General
							</li>
							<li>
								<strong>Internal Review:</strong> Request an internal review of
								our decision
							</li>
						</ul>
					</div>
				</section>

				<footer className="policy-footer">
					<p>
						This Privacy Policy is effective as of December 15, 2024. We may
						update this policy from time to time. We will notify you of any
						material changes by posting the new policy on this page and updating
						the "Last updated" date.
					</p>
				</footer>
			</main>
		</div>
	);
};

export default PrivacyPolicy;
