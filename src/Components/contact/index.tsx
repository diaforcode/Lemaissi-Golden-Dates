import MainHeading from "@/Components/main-heading";
import { Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import getTrans from "@/Lib/translation";

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { contact } = home;
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading
          subTitle={contact.DontHesitate}
          title={contact.contactUs}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-accent"
            href="tel:+213656920026"
          >
            +213656920026
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
