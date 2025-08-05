import { useState } from 'react';
import './DataDeletionGuide.css';

const DataDeletionGuide = () => {
	const [activeSection, setActiveSection] = useState<string>('overview');

	const scrollToSection = (sectionId: string) => {
		setActiveSection(sectionId);
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="deletion-guide-container">
			{/* Navigation Sidebar */}
			<nav className="deletion-nav">
				<div className="nav-header">
					<h3>Data Deletion Guide</h3>
					<p className="last-updated">Last updated: December 15, 2024</p>
				</div>
				<ul className="nav-links">
					<li>
						<button
							className={activeSection === 'delete-account' ? 'active' : ''}
							onClick={() => scrollToSection('delete-account')}
						>
							Delete Account
						</button>
					</li>
				</ul>
			</nav>

			{/* Main Content */}
			<main className="deletion-content">
				<section id="delete-account" className="deletion-section">
					<h1>Delete Account</h1>
					<p className="deletion-intro">
						We respect your privacy and provide you with full control over your
						data. This guide will help you understand how to delete your data
						from our system and what happens during the deletion process.
					</p>

					<div className="important-notice">
						<h2>⚠️ Important Notice</h2>
						<p>
							Data deletion is permanent and cannot be undone. Please ensure you
							have backed up any important content before proceeding with
							deletion.
						</p>
					</div>

					<div className="your-rights">
						<h2>How to delete your account</h2>
						<div className="rights-grid">
							<div className="right-card">
								<h4>Step 1: Go to the account page</h4>
								<p>
									Go to the account page by clicking on the account icon in the
									top right corner of the screen.
								</p>
							</div>
							<div className="right-card">
								<h4>Step 2: Click on the tab "Preferences"</h4>
								<p>
									Click on the tab "Preferences" to see the options to delete
									your account.
								</p>
							</div>
							<div className="right-card">
								<h4>Step 3: Click on the button "Delete Account"</h4>
								<p>
									Click on the button "Delete Account" to delete your account.
								</p>
							</div>
							<div className="right-card">
								<h4>Step 4: Confirm the deletion</h4>
								<p>
									Confirm the deletion by clicking on the button "Delete
									Account" again.
								</p>
							</div>
						</div>
					</div>
				</section>

				<footer className="deletion-footer">
					<p>
						This Data Deletion Guide is part of our commitment to transparency
						and user privacy. We regularly update our deletion processes to
						ensure compliance with privacy laws and best practices.
					</p>
					<p>Last updated: December 15, 2024</p>
				</footer>
			</main>
		</div>
	);
};

export default DataDeletionGuide;
