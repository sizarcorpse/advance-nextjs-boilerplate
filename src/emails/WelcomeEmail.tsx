import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

// TODO: Font doesn't work, need to fix it

export const WelcomeEmail = ({ name = "Sizar Corpse" }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Underground</Preview>
      <Tailwind
        config={{
          theme: {
            fontSize: {
              xs: ["12px", { lineHeight: "16px" }],
              sm: ["14px", { lineHeight: "20px" }],
              base: ["16px", { lineHeight: "24px" }],
              lg: ["18px", { lineHeight: "28px" }],
              xl: ["20px", { lineHeight: "28px" }],
              "2xl": ["24px", { lineHeight: "32px" }],
              "3xl": ["30px", { lineHeight: "36px" }],
              "4xl": ["36px", { lineHeight: "36px" }],
            },
            colors: {
              background: "#f8fafc",
              foreground: "#020617",
              primary: "#0f172a",
              "primary-foreground": "#f1f5f9",
              secondary: "#f1f5f9",
              "secondary-foreground": "#0f172a",
              accent: "#6366f1",
              card: "#e2e8f0",
              "card-foreground": "#0f172a",
            },
            spacing: {
              px: "1px",
              0: "0",
              0.5: "2px",
              1: "4px",
              1.5: "6px",
              2: "8px",
              2.5: "10px",
              3: "12px",
              3.5: "14px",
              4: "16px",
              5: "20px",
              6: "24px",
              7: "28px",
              8: "32px",
              9: "36px",
              10: "40px",
            },
          },
        }}
      >
        <Body className="bg-background">
          <Container className="bg-card p-6 rounded-md">
            <Heading as="h2" className="text-4xl font-bold text-accent my-4">
              {name},{" "}
              <span className="text-secondary-foreground">
                Welcome to Underground, we are excited to have you here!
              </span>
            </Heading>
            <Text className="text-foreground text-xl my-8">
              We are excited to have you here, {name}. We are thrilled to have
              you join our community and we are excited to see what you will
              create with Underground.
            </Text>
            <Section className="my-4">
              <Button
                href="#"
                className="bg-primary text-primary-foreground px-5 py-3 rounded-xl mr-4"
              >
                Get Started
              </Button>
              <Button
                href="#"
                className="bg-secondary text-secondary-foreground px-5 py-3 rounded-xl"
              >
                Start Exploring 🚀
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
