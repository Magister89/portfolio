import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar2.jpg";
import alien from "../assets/alien.gif";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-16 px-6 bg-muted dark:bg-muted-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={alien} alt="Alien" className="h-10 w-10 object-contain" />
            <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark">
              {t.about.title}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark mb-3 leading-relaxed">
            {t.about.p1}
          </p>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark mb-3 leading-relaxed">
            {t.about.p2}
          </p>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark leading-relaxed">
            {t.about.p3}
          </p>
          <div className="mt-5 flex items-center gap-2">
            <Link
              to="/blog"
              className="text-base font-medium italic text-foreground dark:text-foreground-dark underline underline-offset-4 hover:text-muted-foreground dark:hover:text-muted-foreground-dark transition-colors"
            >
              {t.about.p4}
            </Link>
          </div>
        </div>
        <div className="col-span-1 flex justify-center">
          <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-background dark:border-background-dark shadow-lg">
            <img
              src={avatar}
              alt="Giorgio Cembran"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
