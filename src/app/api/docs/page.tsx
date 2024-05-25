import SwaggerDocs from "@/components/swagger/SwaggerDocs";
import ThemeRegistry from "@/components/theme/ThemeRegistry";
import { lightTheme } from "@/components/theme/default";
import { getApiDocs } from "@/modules/swagger/getApiDocs";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container m-auto">
      <ThemeRegistry options={{ key: 'api' }} theme={lightTheme}>
        <SwaggerDocs spec={spec} />
      </ThemeRegistry>
    </section>
  );
}