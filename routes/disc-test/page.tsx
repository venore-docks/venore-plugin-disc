import { notFound } from "next/navigation";
import { getDiscInstanceBySlug } from "../../index";
import { DiscTestRunner } from "./test-runner";

export const dynamic = "force-dynamic";

export default async function DiscTestPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; ambiente?: string }>;
}) {
  const { slug, ambiente } = await searchParams;

  if (slug) {
    const instance = await getDiscInstanceBySlug({ slug });
    if (!instance.success) {
      notFound();
    }
    return (
      <DiscTestRunner
        environmentLabel={instance.data.environmentLabel}
        instanceId={instance.data.id}
        redirectUrl={instance.data.redirectUrl}
      />
    );
  }

  return <DiscTestRunner environmentLabel={ambiente?.trim() || "Geral"} />;
}
