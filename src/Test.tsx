import Rating from "@mui/material/Rating";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

type Language = {
  nativeName: string;
};

const lngs: Record<string, Language> = {
  en: { nativeName: "English" },
  lt: { nativeName: "Lietuviu" },
};

const Test = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              type="submit"
              key={lng}
              onClick={() => i18next.changeLanguage(lng)}
              disabled={i18next.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}{" "}
            </button>
          ))}
        </div>
        {t("textfortesting")} <Rating />
      </div>
    </>
  );
};
export default Test;
