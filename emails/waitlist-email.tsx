import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { Gamepad } from "lucide-react";

import { X } from "~/components/icons";
import { siteConfig } from "~/config/site";

type WaitlistEmailProps = {
  email: string;
};

export const WaitlistEmail = ({ email }: WaitlistEmailProps) => (
  <Tailwind>
    <Html>
      <Head>
        <title>{`${siteConfig.name} - Thank you for joining our waitlist`}</title>
      </Head>
      {/* <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      /> */}
      <Preview>
        Thank you for joining our waitlist and for your patience
      </Preview>

      <Body className="bg-[#fbfbfb]">
        <Text className="mx-auto flex items-end justify-center gap-2 text-lg font-bold lowercase md:text-3xl">
          <Gamepad size={32} />{" "}
          {siteConfig.url.replace(/https:\/\/(www).?/, "")}
        </Text>

        <Text className="mx-auto !-mt-4 flex justify-center font-medium">
          {siteConfig.description}
        </Text>

        <Container className="border border-dashed border-black bg-white p-4 shadow-md md:p-8">
          <Heading className="text-2xl">
            Thank you for joining our waitlist and for your patience 🎉
          </Heading>

          <Text>
            Hi (<b>{email}</b>),
          </Text>

          <Text>
            Thank you for joining the waitlist for{" "}
            <b className="lowercase">{siteConfig.name}</b>! We&apos;re excited
            to have you on board.
          </Text>

          <Text>
            As a waitlist member, you&apos;ll be among the first to know when we
            launch and will receive exclusive updates and early access to our
            features.
          </Text>

          <Text>
            In the meantime, feel free to follow us on{" "}
            <Link href={siteConfig.links.x} className="text-blue-500 underline">
              <X size={16} />
            </Link>{" "}
            for the latest news and updates.
          </Text>

          <Text>
            If you have any questions or need assistance, don&apos;t hesitate to
            reach out to us at{" "}
            <Link
              href={`mailto:${siteConfig.email}`}
              className="text-blue-500 underline"
            >
              {siteConfig.email}
            </Link>
            .
          </Text>

          <Text>Thank you for your patience and support!</Text>

          <Text>
            Best,
            <br />
            The {siteConfig.name} team
          </Text>

          <Hr />
          <Text>{siteConfig.address}</Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default WaitlistEmail;
