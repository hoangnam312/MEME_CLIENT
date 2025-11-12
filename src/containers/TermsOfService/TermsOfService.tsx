import { useState } from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
	const [activeSection, setActiveSection] = useState<string>('overview');

	const scrollToSection = (sectionId: string) => {
		setActiveSection(sectionId);
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="terms-container">
			{/* Navigation Sidebar */}
			<nav className="terms-nav">
				<div className="nav-header">
					<h3>Terms of Service</h3>
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
							className={activeSection === 'definitions' ? 'active' : ''}
							onClick={() => scrollToSection('definitions')}
						>
							Definitions
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'account' ? 'active' : ''}
							onClick={() => scrollToSection('account')}
						>
							Account Terms
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'content' ? 'active' : ''}
							onClick={() => scrollToSection('content')}
						>
							Content Guidelines
						</button>
					</li>
					<li>
						<button
							className={
								activeSection === 'intellectual-property' ? 'active' : ''
							}
							onClick={() => scrollToSection('intellectual-property')}
						>
							Intellectual Property
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'prohibited' ? 'active' : ''}
							onClick={() => scrollToSection('prohibited')}
						>
							Prohibited Activities
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'liability' ? 'active' : ''}
							onClick={() => scrollToSection('liability')}
						>
							Liability & Disclaimers
						</button>
					</li>
					<li>
						<button
							className={activeSection === 'termination' ? 'active' : ''}
							onClick={() => scrollToSection('termination')}
						>
							Termination
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
			<main className="terms-content">
				<section id="overview" className="terms-section">
					<h1>Terms of Service</h1>
					<p className="terms-intro">
						Welcome to Meme nya! These Terms of Service ("Terms") govern your
						use of our meme sharing platform and related services (collectively,
						the "Service"). By accessing or using our Service, you agree to be
						bound by these Terms and our Privacy Policy.
					</p>

					<div className="acceptance-section">
						<h2>Acceptance of Terms</h2>
						<p>
							By using our Service, you acknowledge that you have read,
							understood, and agree to be bound by these Terms. If you do not
							agree to these Terms, please do not use our Service.
						</p>
						<p>
							We reserve the right to modify these Terms at any time. We will
							notify users of any material changes by posting the updated Terms
							on this page and updating the "Last updated" date.
						</p>
					</div>
				</section>

				<section id="definitions" className="terms-section">
					<h2>Definitions</h2>

					<div className="definitions-grid">
						<div className="definition-card">
							<h4>"Service"</h4>
							<p>
								Refers to the Meme nya platform, including our website, mobile
								applications, and all related services.
							</p>
						</div>
						<div className="definition-card">
							<h4>"User"</h4>
							<p>
								Any individual or entity that accesses or uses our Service,
								including registered and unregistered users.
							</p>
						</div>
						<div className="definition-card">
							<h4>"Content"</h4>
							<p>
								Any text, images, videos, memes, comments, or other materials
								uploaded, posted, or shared on our Service.
							</p>
						</div>
						<div className="definition-card">
							<h4>"Account"</h4>
							<p>
								A registered profile that allows users to access certain
								features of our Service.
							</p>
						</div>
						<div className="definition-card">
							<h4>"We," "Us," "Our"</h4>
							<p>
								Refers to Meme nya and its affiliates, employees, officers, and
								agents.
							</p>
						</div>
						<div className="definition-card">
							<h4>"You," "Your"</h4>
							<p>Refers to the individual or entity using our Service.</p>
						</div>
					</div>
				</section>

				<section id="account" className="terms-section">
					<h2>Account Terms</h2>

					<div className="account-requirements">
						<h3>Account Registration</h3>
						<ul>
							<li>You must be at least 13 years old to create an account</li>
							<li>
								You must provide accurate, current, and complete information
							</li>
							<li>
								You are responsible for maintaining the security of your account
							</li>
							<li>You may not share your account credentials with others</li>
							<li>
								You are responsible for all activities that occur under your
								account
							</li>
						</ul>
					</div>

					<div className="account-obligations">
						<h3>Account Responsibilities</h3>
						<div className="obligations-grid">
							<div className="obligation-card">
								<h4>Security</h4>
								<p>
									You must keep your password secure and notify us immediately
									of any unauthorized use.
								</p>
							</div>
							<div className="obligation-card">
								<h4>Accuracy</h4>
								<p>
									You must provide and maintain accurate account information.
								</p>
							</div>
							<div className="obligation-card">
								<h4>Compliance</h4>
								<p>You must comply with all applicable laws and these Terms.</p>
							</div>
							<div className="obligation-card">
								<h4>Notification</h4>
								<p>
									You must notify us of any changes to your account information.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="content" className="terms-section">
					<h2>Content Guidelines</h2>

					<div className="content-standards">
						<h3>Content Standards</h3>
						<p>
							All content uploaded to our Service must comply with the following
							standards:
						</p>

						<div className="standards-grid">
							<div className="standard-card">
								<h4>Appropriate Content</h4>
								<ul>
									<li>Content must be suitable for a general audience</li>
									<li>No explicit sexual content or nudity</li>
									<li>No graphic violence or gore</li>
									<li>No hate speech or discriminatory content</li>
								</ul>
							</div>
							<div className="standard-card">
								<h4>Original or Licensed</h4>
								<ul>
									<li>You must own the rights to your content</li>
									<li>Or have proper licensing/permission</li>
									<li>Respect intellectual property rights</li>
									<li>No unauthorized use of copyrighted material</li>
								</ul>
							</div>
							<div className="standard-card">
								<h4>No Harmful Content</h4>
								<ul>
									<li>No malware, viruses, or harmful code</li>
									<li>No phishing or scam content</li>
									<li>No content that could harm users</li>
									<li>No spam or misleading information</li>
								</ul>
							</div>
							<div className="standard-card">
								<h4>Respectful Behavior</h4>
								<ul>
									<li>No harassment or bullying</li>
									<li>No impersonation of others</li>
									<li>No invasion of privacy</li>
									<li>Be respectful to other users</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="content-moderation">
						<h3>Content Moderation</h3>
						<p>We reserve the right to:</p>
						<ul>
							<li>Review and moderate all content uploaded to our Service</li>
							<li>Remove content that violates these Terms</li>
							<li>Suspend or terminate accounts for violations</li>
							<li>Report illegal content to appropriate authorities</li>
							<li>Take action against repeat offenders</li>
						</ul>
					</div>
				</section>

				<section id="intellectual-property" className="terms-section">
					<h2>Intellectual Property Rights</h2>

					<div className="ip-ownership">
						<h3>Your Content</h3>
						<p>
							You retain ownership of the content you upload to our Service.
							However, by uploading content, you grant us a worldwide,
							non-exclusive, royalty-free license to:
						</p>
						<ul>
							<li>
								Display, reproduce, and distribute your content on our Service
							</li>
							<li>Use your content for promotional purposes</li>
							<li>Modify your content as necessary for technical purposes</li>
							<li>Sub-license your content to other users of our Service</li>
						</ul>
					</div>

					<div className="our-rights">
						<h3>Our Rights</h3>
						<p>
							Our Service and its original content, features, and functionality
							are owned by Meme nya and are protected by international
							copyright, trademark, patent, trade secret, and other intellectual
							property laws.
						</p>

						<div className="rights-grid">
							<div className="right-card">
								<h4>Service Ownership</h4>
								<p>
									We own all rights, title, and interest in and to the Service,
									including all intellectual property rights.
								</p>
							</div>
							<div className="right-card">
								<h4>Trademarks</h4>
								<p>
									Meme nya and related logos are trademarks of our company and
									may not be used without permission.
								</p>
							</div>
							<div className="right-card">
								<h4>Feedback</h4>
								<p>
									Any feedback you provide becomes our property and we may use
									it without restriction.
								</p>
							</div>
						</div>
					</div>

					<div className="copyright-policy">
						<h3>Copyright Policy</h3>
						<p>
							We respect intellectual property rights and expect our users to do
							the same. If you believe your copyrighted work has been used
							without permission, please contact us with:
						</p>
						<ul>
							<li>A description of the copyrighted work</li>
							<li>The location of the infringing material on our Service</li>
							<li>Your contact information</li>
							<li>
								A statement of good faith belief that the use is not authorized
							</li>
							<li>
								A statement that the information is accurate and you are
								authorized to act on behalf of the copyright owner
							</li>
						</ul>
					</div>
				</section>

				<section id="prohibited" className="terms-section">
					<h2>Prohibited Activities</h2>

					<div className="prohibited-activities">
						<h3>You agree not to:</h3>

						<div className="prohibited-grid">
							<div className="prohibited-card">
								<h4>Illegal Activities</h4>
								<ul>
									<li>Use the Service for any illegal purpose</li>
									<li>Violate any applicable laws or regulations</li>
									<li>Infringe on intellectual property rights</li>
									<li>Engage in fraud or deceptive practices</li>
								</ul>
							</div>
							<div className="prohibited-card">
								<h4>Security Violations</h4>
								<ul>
									<li>Attempt to gain unauthorized access to our systems</li>
									<li>Interfere with the Service's security features</li>
									<li>Introduce viruses, malware, or harmful code</li>
									<li>Attempt to reverse engineer our software</li>
								</ul>
							</div>
							<div className="prohibited-card">
								<h4>Service Abuse</h4>
								<ul>
									<li>Overload or crash our servers</li>
									<li>Use automated tools to access the Service</li>
									<li>Scrape or collect user data without permission</li>
									<li>Circumvent any access restrictions</li>
								</ul>
							</div>
							<div className="prohibited-card">
								<h4>Content Violations</h4>
								<ul>
									<li>Upload content that violates our guidelines</li>
									<li>Post spam or misleading information</li>
									<li>Harass or bully other users</li>
									<li>Impersonate others or create fake accounts</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section id="liability" className="terms-section">
					<h2>Liability and Disclaimers</h2>

					<div className="disclaimers">
						<h3>Service Disclaimers</h3>
						<div className="disclaimer-grid">
							<div className="disclaimer-card">
								<h4>Service Availability</h4>
								<p>
									We provide the Service "as is" and "as available" without any
									warranties. We do not guarantee that the Service will be
									uninterrupted or error-free.
								</p>
							</div>
							<div className="disclaimer-card">
								<h4>Content Accuracy</h4>
								<p>
									We do not verify the accuracy, completeness, or usefulness of
									any content posted by users. You use content at your own risk.
								</p>
							</div>
							<div className="disclaimer-card">
								<h4>Third-Party Content</h4>
								<p>
									We are not responsible for content posted by third parties or
									links to external websites. We do not endorse third-party
									content.
								</p>
							</div>
							<div className="disclaimer-card">
								<h4>Data Loss</h4>
								<p>
									We are not responsible for any loss of data or content. You
									should maintain backups of your important content.
								</p>
							</div>
						</div>
					</div>

					<div className="limitation-of-liability">
						<h3>Limitation of Liability</h3>
						<p>
							To the maximum extent permitted by law, Meme nya shall not be
							liable for any indirect, incidental, special, consequential, or
							punitive damages, including but not limited to:
						</p>
						<ul>
							<li>Loss of profits, data, or use</li>
							<li>Business interruption</li>
							<li>Personal injury or property damage</li>
							<li>Emotional distress</li>
							<li>Any damages arising from your use of the Service</li>
						</ul>
						<p>
							Our total liability to you for any claims shall not exceed the
							amount you paid us in the 12 months preceding the claim.
						</p>
					</div>

					<div className="indemnification">
						<h3>Indemnification</h3>
						<p>
							You agree to defend, indemnify, and hold harmless Meme nya and its
							affiliates from and against any claims, damages, obligations,
							losses, liabilities, costs, or debt arising from:
						</p>
						<ul>
							<li>Your use of the Service</li>
							<li>Your violation of these Terms</li>
							<li>Your violation of any third-party rights</li>
							<li>Your content uploaded to the Service</li>
						</ul>
					</div>
				</section>

				<section id="termination" className="terms-section">
					<h2>Termination</h2>

					<div className="termination-options">
						<h3>Termination by You</h3>
						<p>You may terminate your account at any time by:</p>
						<ul>
							<li>Deleting your account through the account settings</li>
							<li>Contacting our support team</li>
							<li>Simply ceasing to use our Service</li>
						</ul>
						<p>
							Upon termination, your right to use the Service will cease
							immediately.
						</p>
					</div>

					<div className="termination-by-us">
						<h3>Termination by Us</h3>
						<p>
							We may terminate or suspend your account immediately, without
							prior notice, for conduct that we believe:
						</p>
						<ul>
							<li>Violates these Terms</li>
							<li>Violates applicable laws</li>
							<li>Could harm other users or our Service</li>
							<li>Could expose us to legal liability</li>
						</ul>
					</div>

					<div className="post-termination">
						<h3>Effect of Termination</h3>
						<p>Upon termination:</p>
						<ul>
							<li>Your right to access the Service will cease</li>
							<li>We may delete your account and content</li>
							<li>
								Provisions that should survive termination will remain in effect
							</li>
							<li>
								You remain liable for any violations that occurred before
								termination
							</li>
						</ul>
					</div>
				</section>

				<section id="contact" className="terms-section">
					<h2>Contact Information</h2>

					<div className="contact-grid">
						<div className="contact-card">
							<h3>General Inquiries</h3>
							<p>
								<strong>Email:</strong> memenya.com@gmail.com
							</p>
							<p>
								<strong>Response Time:</strong> Within 30 days
							</p>
							<p>
								<strong>Language:</strong> Vietnamese or English
							</p>
						</div>
					</div>

					<div className="governing-law">
						<h3>Governing Law</h3>
						<p>
							These Terms are governed by and construed in accordance with the
							laws of Vietnam. Any disputes arising from these Terms or your use
							of the Service will be resolved in the courts of Vietnam.
						</p>
					</div>

					<div className="dispute-resolution">
						<h3>Dispute Resolution</h3>
						<p>
							Before pursuing formal legal action, we encourage you to contact
							us directly to resolve any disputes. If we cannot resolve the
							dispute informally, you agree to:
						</p>
						<ul>
							<li>First attempt to resolve the dispute through mediation</li>
							<li>Submit to the jurisdiction of Vietnamese courts</li>
							<li>Waive any right to a jury trial</li>
							<li>
								Resolve disputes on an individual basis (no class actions)
							</li>
						</ul>
					</div>
				</section>

				<footer className="terms-footer">
					<p>
						These Terms of Service are effective as of December 15, 2024. We may
						update these Terms from time to time. We will notify you of any
						material changes by posting the updated Terms on this page and
						updating the "Last updated" date.
					</p>
				</footer>
			</main>
		</div>
	);
};

export default TermsOfService;
