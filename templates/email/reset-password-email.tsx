
import {
    Body,
    Button,
    Container,
    Font,
    Head,
    Html,
    Section,
    Text
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type Props = {
    name: string
    resetPasswordLink: string
}

export function ResetPasswordEmail({ name, resetPasswordLink }: Props) {
    return (
        <Html>
            <Head />
            <Font
                fontFamily="Monomaniac-One"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/monomaniacone/v11/4iC06K17YctZjx50EU-QlwPmcpRgo4g.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
            <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Text className="text-black text-[24px] font-[Monomaniac-One] font-normal font-bold text-center p-0 my-[30px] mx-0">
                            ShortsHub
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello <strong>{name}</strong>,
                        </Text>
                        <Text className="text-black text-[16px] leading-[24px] underline">
                            We received a request to reset your password.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you did not request a password reset, please
                            ignore this email.
                        </Text>

                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={resetPasswordLink}
                            >
                                Reset Password
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
