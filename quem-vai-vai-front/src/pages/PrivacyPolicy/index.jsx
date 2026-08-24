import GlobalSwitches from "@/components/Switches/GlobalSwitches";
import { Box, Typography, useTheme, Link } from "@mui/material";

export default function PrivacyPolicy() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                p: { xs: 2, md: 4 },
            }}
        >
            <GlobalSwitches top={16} />

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    mx: "auto",
                    pt: 8,
                    pb: 6,
                }}
            >
                <Typography
                    variant="h3"
                    color={theme.palette.primary.main}
                    gutterBottom
                    sx={{
                        fontSize: { xs: "2rem", md: "3rem" },
                    }}
                >
                    Política de Privacidade — Quem Vai Vai
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={4}
                >
                    Última atualização: 24 de agosto de 2026
                </Typography>

                <Typography variant="body1" paragraph>
                    Esta Política de Privacidade explica como o aplicativo Quem Vai Vai
                    coleta, utiliza, armazena e protege os dados pessoais de seus
                    usuários.
                </Typography>

                <Section title="1. Identificação do responsável">
                    <Typography variant="body1" paragraph>
                        O aplicativo <strong>Quem Vai Vai</strong> é desenvolvido e
                        disponibilizado por <strong>Fernando Angelim Aragão</strong>,
                        responsável pelo tratamento dos dados pessoais utilizados no
                        aplicativo.
                    </Typography>

                    <Typography variant="body1">
                        E-mail para contato:{" "}
                        <Link href="mailto:fernandoangelima@gmail.com">
                            fernandoangelima@gmail.com
                        </Link>
                    </Typography>
                </Section>

                <Section title="2. Quais dados coletamos">
                    <Typography variant="body1" paragraph>
                        Atualmente, o Quem Vai Vai coleta os seguintes dados pessoais:
                    </Typography>

                    <Typography component="ul" variant="body1">
                        <li>Endereço de e-mail;</li>
                        <li>Senha de acesso;</li>
                        <li>Informações criadas e publicadas pelo usuário dentro da plataforma.</li>
                    </Typography>
                </Section>

                <Section title="3. Dados de cadastro e autenticação">
                    <Typography variant="body1">
                        O endereço de e-mail e a senha são utilizados para criação da
                        conta, autenticação e acesso às funcionalidades do aplicativo.
                        As credenciais são tratadas de forma segura e utilizadas
                        exclusivamente para as finalidades relacionadas à autenticação
                        da conta.
                    </Typography>
                </Section>

                <Section title="4. Conteúdo criado pelo usuário">
                    <Typography variant="body1">
                        O aplicativo permite que os usuários criem e publiquem
                        informações dentro da plataforma. As informações publicadas
                        poderão ficar visíveis para outros usuários, de acordo com as
                        funcionalidades disponibilizadas pelo aplicativo.
                    </Typography>

                    <Typography variant="body1" mt={2}>
                        O usuário é responsável pelas informações que decide publicar na
                        plataforma.
                    </Typography>
                </Section>

                <Section title="5. Para que utilizamos os dados">
                    <Typography variant="body1" paragraph>
                        Os dados coletados podem ser utilizados para:
                    </Typography>

                    <Typography component="ul" variant="body1">
                        <li>Criar e administrar contas de usuários;</li>
                        <li>Permitir login e autenticação;</li>
                        <li>Identificar usuários dentro da plataforma;</li>
                        <li>Disponibilizar as funcionalidades do Quem Vai Vai;</li>
                        <li>Armazenar e disponibilizar conteúdos publicados;</li>
                        <li>Enviar comunicações relacionadas ao funcionamento da conta;</li>
                        <li>Garantir a segurança e o funcionamento adequado da plataforma;</li>
                        <li>Cumprir obrigações legais, quando aplicável.</li>
                    </Typography>
                </Section>

                <Section title="6. Serviços de terceiros">
                    <Typography variant="body1" paragraph>
                        Para operar o Quem Vai Vai, utilizamos serviços de terceiros que
                        podem processar ou armazenar dados em nosso nome.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Brevo
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Utilizamos a Brevo para serviços relacionados ao envio de
                        e-mails. O endereço de e-mail do usuário poderá ser utilizado
                        nesse serviço quando necessário para o envio de comunicações
                        relacionadas ao aplicativo.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Render
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Utilizamos a Render para hospedagem e execução da infraestrutura
                        do backend da aplicação.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Neon
                    </Typography>

                    <Typography variant="body1">
                        Utilizamos a Neon para hospedagem do banco de dados utilizado pelo
                        aplicativo.
                    </Typography>
                </Section>

                <Section title="7. Venda de dados pessoais">
                    <Typography variant="body1">
                        O Quem Vai Vai não vende dados pessoais dos usuários. Os dados são
                        utilizados para as finalidades descritas nesta Política de
                        Privacidade e para a operação dos serviços oferecidos pelo
                        aplicativo.
                    </Typography>
                </Section>

                <Section title="8. Segurança dos dados">
                    <Typography variant="body1">
                        Adotamos medidas técnicas e organizacionais razoáveis para
                        proteger os dados pessoais contra acesso não autorizado,
                        alteração, divulgação ou destruição indevida.
                    </Typography>

                    <Typography variant="body1" mt={2}>
                        Apesar das medidas de segurança adotadas, nenhum sistema conectado
                        à internet pode ser considerado completamente seguro. Por isso,
                        não é possível garantir segurança absoluta dos dados.
                    </Typography>
                </Section>

                <Section title="9. Armazenamento e retenção dos dados">
                    <Typography variant="body1">
                        Os dados pessoais são mantidos enquanto forem necessários para o
                        funcionamento da conta e dos serviços oferecidos pelo Quem Vai
                        Vai, ou enquanto houver uma finalidade legítima ou obrigação legal
                        que justifique sua conservação.
                    </Typography>
                </Section>

                <Section title="10. Exclusão da conta e dos dados">
                    <Typography variant="body1">
                        O usuário pode solicitar a exclusão de sua conta diretamente pelo
                        aplicativo.
                    </Typography>

                    <Typography variant="body1" mt={2}>
                        Após a solicitação, os dados pessoais associados à conta serão
                        excluídos, observadas eventuais hipóteses legais que permitam ou
                        exijam a conservação de determinadas informações.
                    </Typography>

                    <Typography variant="body1" mt={2}>
                        Conteúdos relacionados à conta também poderão ser excluídos ou
                        desvinculados, conforme a natureza do conteúdo e as funcionalidades
                        do aplicativo.
                    </Typography>
                </Section>

                <Section title="11. Direitos dos titulares">
                    <Typography variant="body1" paragraph>
                        Nos termos da legislação aplicável, especialmente da Lei Geral de
                        Proteção de Dados Pessoais (LGPD), o usuário poderá, quando
                        aplicável:
                    </Typography>

                    <Typography component="ul" variant="body1">
                        <li>Solicitar confirmação da existência de tratamento de seus dados;</li>
                        <li>Solicitar acesso aos seus dados pessoais;</li>
                        <li>Solicitar correção de dados incompletos ou incorretos;</li>
                        <li>Solicitar anonimização, bloqueio ou eliminação de dados;</li>
                        <li>Solicitar informações sobre o compartilhamento de seus dados;</li>
                        <li>Revogar o consentimento, quando aplicável;</li>
                        <li>Exercer outros direitos previstos na legislação aplicável.</li>
                    </Typography>

                    <Typography variant="body1" mt={2}>
                        As solicitações podem ser realizadas por meio do contato indicado
                        nesta Política de Privacidade.
                    </Typography>
                </Section>

                <Section title="12. Dados de menores de idade">
                    <Typography variant="body1">
                        O Quem Vai Vai não é destinado especificamente a crianças.
                        Caso um responsável tenha conhecimento de que dados pessoais
                        foram fornecidos ao aplicativo de forma inadequada, poderá entrar
                        em contato pelo endereço indicado nesta Política de Privacidade.
                    </Typography>
                </Section>

                <Section title="13. Alterações nesta Política de Privacidade">
                    <Typography variant="body1">
                        Esta Política de Privacidade poderá ser atualizada periodicamente
                        para refletir alterações nas funcionalidades do aplicativo, nos
                        serviços utilizados ou nas obrigações legais aplicáveis.
                    </Typography>

                    <Typography variant="body1" mt={2}>
                        A data da última atualização será sempre indicada no início desta
                        Política.
                    </Typography>
                </Section>

                <Section title="14. Contato">
                    <Typography variant="body1" paragraph>
                        Caso tenha dúvidas sobre esta Política de Privacidade, sobre o
                        tratamento de seus dados pessoais ou queira exercer seus direitos,
                        entre em contato:
                    </Typography>

                    <Typography variant="body1">
                        <strong>Responsável:</strong> Fernando Angelim Aragão
                    </Typography>

                    <Typography variant="body1">
                        <strong>E-mail:</strong>{" "}
                        <Link href="mailto:fernandoangelima@gmail.com">
                            fernandoangelima@gmail.com
                        </Link>
                    </Typography>
                </Section>
            </Box>
        </Box>
    );
}

function Section({ title, children }) {
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                mt: 4,
            }}
        >
            <Typography
                variant="h5"
                color={theme.palette.primary.main}
                gutterBottom
            >
                {title}
            </Typography>

            {children}
        </Box>
    );
}