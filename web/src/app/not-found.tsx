import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Display, Eyebrow } from "@/components/primitives/Type";

export default function NotFound() {
  return (
    <Section ground="paper" rhythm="none" className="pb-4xl pt-40 md:pt-48">
      <Container width="wide">
        <Eyebrow>Página no encontrada</Eyebrow>

        <Display as="h1" className="mt-lg">
          Esta página no existe o cambió de lugar.
        </Display>

        <div className="mt-2xl flex flex-wrap gap-xl">
          <ActionButton href="/obra">Ver la obra</ActionButton>
          <ActionButton href="/">Volver al inicio</ActionButton>
        </div>
      </Container>
    </Section>
  );
}
