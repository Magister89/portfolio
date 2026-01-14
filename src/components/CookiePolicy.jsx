import { useLanguage } from '../context/LanguageContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const CookiePolicy = ({ isOpen, onClose }) => {
    const { t } = useLanguage();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] p-0">
                <DialogHeader className="p-6 border-b border-border dark:border-border-dark">
                    <DialogTitle className="text-xl font-bold text-foreground dark:text-foreground-dark">
                        {t.cookiePolicy.title}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[50vh]">
                    <div className="p-6 text-muted-foreground dark:text-muted-foreground-dark space-y-4 leading-relaxed text-sm">
                        <p>
                            {t.cookiePolicy.intro}
                        </p>

                        <h3 className="text-base font-bold text-foreground dark:text-foreground-dark mt-4">{t.cookiePolicy.whatAreCookiesTitle}</h3>
                        <p>
                            {t.cookiePolicy.whatAreCookiesText}
                        </p>

                        <h3 className="text-base font-bold text-foreground dark:text-foreground-dark mt-4">{t.cookiePolicy.howWeUseCookiesTitle}</h3>
                        <p>
                            {t.cookiePolicy.howWeUseCookiesText}
                        </p>

                        <h3 className="text-base font-bold text-foreground dark:text-foreground-dark mt-4">{t.cookiePolicy.typesOfCookiesTitle}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>{t.cookiePolicy.necessaryCookies}</strong> {t.cookiePolicy.necessaryCookiesText}
                                <br />
                                <em>{t.cookiePolicy.localStorageNote}</em>
                            </li>
                            <li>
                                <strong>{t.cookiePolicy.analyticsCookies}</strong> {t.cookiePolicy.analyticsCookiesText}
                            </li>
                        </ul>

                        <h3 className="text-base font-bold text-foreground dark:text-foreground-dark mt-4">{t.cookiePolicy.controlCookiesTitle}</h3>
                        <p>
                            {t.cookiePolicy.controlCookiesText}
                        </p>
                    </div>
                </ScrollArea>

                <DialogFooter className="p-6 border-t border-border dark:border-border-dark bg-muted dark:bg-muted-dark">
                    <Button
                        onClick={onClose}
                        className="w-full"
                    >
                        {t.cookiePolicy.close}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CookiePolicy;
