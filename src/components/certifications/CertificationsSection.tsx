import React from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck, FileCheck } from 'lucide-react';
import { Certification } from '../../types/content';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="credentials" className="py-24 bg-cream relative border-t border-burgundy/10 cad-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-burgundy/15">
          <div>
            <div className="text-xs font-mono text-dusky uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 05 // CERTIFIED COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-wine tracking-tight">
              Certifications &amp; Credentials
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs font-mono text-taupe max-w-sm">
            Verified engineering credentials from Dassault Systèmes, ROS 2, ARM, and IEEE societies.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <Award className="w-5 h-5 text-dusky" />
                  </div>
                  <span className="text-[10px] font-mono text-taupe flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Issued: {cert.issueDate}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-wine text-lg">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-burgundy font-medium mt-0.5">
                    {cert.issuingOrganization}
                  </p>
                </div>

                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-taupe bg-cream px-3 py-1.5 rounded border border-burgundy/10">
                    <span className="text-taupe-dark">Credential ID: </span>
                    <span className="font-semibold text-wine">{cert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-burgundy/10 flex items-center justify-between text-xs font-mono">
                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-burgundy hover:text-wine font-semibold transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 text-dusky" />
                  </a>
                ) : (
                  <span className="text-taupe flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Institution Verified</span>
                  </span>
                )}

                {cert.certificateFileUrl && (
                  <a
                    href={cert.certificateFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-taupe hover:text-burgundy transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-dusky" />
                    <span>View Document</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
