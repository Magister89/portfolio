import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

// GitHub Gist for certifications data (without commit hash to always get latest version)
const CERTIFICATIONS_GIST_URL =
  "https://gist.githubusercontent.com/Magister89/a77718d159e04d4b175a9432d2b17891/raw/fa8e769dd0e1dd7493b943b188a4f438a54dd608/certifications.json";

const SKELETON_COUNT = 7;

// Format date string to locale format
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month] = dateStr.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Skeleton loading card component
const SkeletonCard = () => (
  <Card className="h-full bg-muted dark:bg-muted-dark">
    <CardContent className="p-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-background dark:bg-background-dark rounded"></div>
        <div className="h-3 w-1/2 bg-background dark:bg-background-dark rounded"></div>
        <div className="h-3 w-1/3 bg-background dark:bg-background-dark rounded"></div>
      </div>
    </CardContent>
  </Card>
);

// Certification card component
const CertificationCard = ({ certification }) => (
  <a
    href={certification.credentialUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block group"
  >
    <Card className="h-full bg-muted dark:bg-muted-dark transition-shadow duration-300 hover:shadow-card-hover">
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground dark:text-foreground-dark leading-tight group-hover:underline underline-offset-2">
            {certification.name}
          </h3>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
            {certification.issuer}
          </p>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
            {formatDate(certification.issueDate)}
            {certification.expirationDate &&
              ` - ${formatDate(certification.expirationDate)}`}
          </p>
        </div>
      </CardContent>
    </Card>
  </a>
);

// Section header component
const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-center gap-3 mb-10">
    <span className="material-symbols-outlined text-3xl text-foreground dark:text-foreground-dark">
      workspace_premium
    </span>
    <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark">
      {title}
    </h2>
  </div>
);

const Certifications = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load: observe when section enters viewport
  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  // Fetch data only when visible with AbortController
  useEffect(() => {
    if (!isVisible) return;

    const controller = new AbortController();

    const fetchCertifications = async () => {
      try {
        const response = await fetch(CERTIFICATIONS_GIST_URL, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCertifications(data.certifications || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching certifications:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCertifications();

    return () => controller.abort();
  }, [isVisible]);

  // Skeleton loading state
  if (!isVisible || loading) {
    return (
      <section
        ref={sectionRef}
        id="certifications"
        className="py-16 px-6 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={t.certifications.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state - silent fail (consistent with Activities.jsx)
  if (error) return null;

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-16 px-6 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.certifications.title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
            {t.certifications.viewAll}{" "}
            <a
              href="https://www.credly.com/users/giorgio-cembran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground dark:text-foreground-dark font-medium underline underline-offset-4 hover:text-muted-foreground dark:hover:text-muted-foreground-dark transition-colors"
            >
              Credly
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
