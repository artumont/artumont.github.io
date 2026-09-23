'use client';

import {
    Circle,
    Document,
    Font,
    Link,
    Page,
    Path,
    Rect,
    StyleSheet,
    Svg,
    Text,
    View,
} from '@react-pdf/renderer';
import { cvAppearance, cvData, cvFonts, type CvLanguage } from '@/data/cv-data';

const activeFont = cvFonts[cvAppearance.font];

if (activeFont.sources.length > 0) {
    Font.register({
        family: activeFont.family,
        fonts: activeFont.sources.map(source => ({ ...source })),
    });
}

Font.registerHyphenationCallback(word => [word]);

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_PADDING_X = 42;
const CONTACT_ICON_COLOR = '#ffffff';

// Suelo tipografico: cuerpo y metadatos nunca por debajo de 9pt, bullets de rol y
// proyectos nunca por debajo de 10pt (ver .pi/cv/rubric.md seccion 3.7).
const BODY_FONT_SIZE = 9.5;
const META_FONT_SIZE = 9;
const BULLET_FONT_SIZE = 10;

const styles = StyleSheet.create({
    // Todo el documento es una sola columna en flujo normal: sin position absolute,
    // sin columnas laterales, para que el orden de lectura del parser sea el visual.
    page: {
        fontFamily: activeFont.family,
        fontSize: BODY_FONT_SIZE,
        color: '#111111',
        backgroundColor: '#ffffff',
        paddingBottom: 14,
    },
    header: {
        color: '#ffffff',
        backgroundColor: '#000000',
        paddingTop: 12,
        paddingHorizontal: PAGE_PADDING_X,
        paddingBottom: 9,
    },
    main: {
        paddingTop: 8,
        paddingHorizontal: PAGE_PADDING_X,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    title: {
        fontSize: 10.5,
        color: '#d9d9d9',
        marginTop: 2,
    },
    summary: {
        fontSize: BODY_FONT_SIZE,
        lineHeight: 1.3,
        color: '#ebebeb',
    },
    contactGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 6,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    contactIcon: {
        width: 15,
        marginRight: 4,
        alignItems: 'center',
    },
    contactText: {
        fontSize: BODY_FONT_SIZE,
        color: '#ffffff',
    },
    contactLink: {
        fontSize: BODY_FONT_SIZE,
        color: '#ffffff',
        textDecoration: 'underline',
    },
    // Ritmo vertical: cada seccion lleva el mismo espacio despues.
    section: {
        marginBottom: 7,
    },
    sectionHeader: {
        marginBottom: 3,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 1,
    },
    sectionRule: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionNode: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#666666',
    },
    sectionLine: {
        flexGrow: 1,
        height: 1,
        backgroundColor: '#111111',
    },
    // Fila con etiqueta a la izquierda y metadato alineado a la derecha.
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rowMeta: {
        flexShrink: 0,
        fontSize: META_FONT_SIZE,
        fontStyle: 'italic',
        color: '#444444',
        marginLeft: 12,
    },
    skillItem: {
        fontSize: BODY_FONT_SIZE,
        lineHeight: 1.25,
        marginBottom: 1.5,
        paddingLeft: 8,
    },
    skillFamily: {
        fontWeight: 'bold',
    },
    languageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    languageItem: {
        width: '50%',
        fontSize: BODY_FONT_SIZE,
        lineHeight: 1.25,
        marginBottom: 1.5,
        paddingLeft: 8,
    },
    workCompany: {
        flexShrink: 1,
        fontSize: 10.5,
        fontWeight: 'bold',
    },
    workRole: {
        flexShrink: 1,
        fontSize: META_FONT_SIZE,
        fontStyle: 'italic',
        color: '#333333',
    },
    highlight: {
        fontSize: BULLET_FONT_SIZE,
        lineHeight: 1.26,
        marginTop: 3,
        paddingLeft: 9,
    },
    highlightLabel: {
        fontWeight: 'bold',
    },
    projectItem: {
        marginBottom: 4,
    },
    projectName: {
        flexShrink: 1,
        fontSize: 10.5,
        fontWeight: 'bold',
    },
    projectLink: {
        flexShrink: 0,
        fontSize: META_FONT_SIZE,
        fontStyle: 'italic',
        color: '#111111',
        textDecoration: 'underline',
        marginLeft: 12,
    },
    projectDescription: {
        fontSize: BULLET_FONT_SIZE,
        lineHeight: 1.26,
        color: '#222222',
    },
    projectMeta: {
        fontSize: META_FONT_SIZE,
        fontStyle: 'italic',
        color: '#444444',
        marginTop: 1,
    },
    certificationItem: {
        fontSize: META_FONT_SIZE,
        lineHeight: 1.15,
        marginBottom: 1.5,
        paddingLeft: 8,
    },
    certificationName: {
        fontWeight: 'bold',
    },
    educationInstitution: {
        flexShrink: 1,
        fontSize: 10.5,
        fontWeight: 'bold',
    },
    educationProgram: {
        flexShrink: 1,
        fontSize: META_FONT_SIZE,
        fontStyle: 'italic',
        color: '#333333',
    },
});

type ContactType = 'phone' | 'email' | 'website' | 'github' | 'location';

function ContactIcon({ type }: { type: ContactType }) {
    if (type === 'phone') {
        return (
            <Svg viewBox="0 0 24 24" width={14} height={14}>
                <Path d="M7 2h10v20H7z" fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1.2} />
                <Path d="M10 4h4M11 20h2" fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1} />
            </Svg>
        );
    }

    if (type === 'email') {
        return (
            <Svg viewBox="0 0 24 24" width={15} height={15}>
                <Rect x={2} y={5} width={20} height={14} fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1.2} />
                <Path d="M2 6l10 8 10-8" fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1.2} />
            </Svg>
        );
    }

    if (type === 'github') {
        return (
            <Svg viewBox="0 0 16 16" width={13} height={13}>
                <Path
                    fill={CONTACT_ICON_COLOR}
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
            </Svg>
        );
    }

    if (type === 'website') {
        return (
            <Svg viewBox="0 0 24 24" width={15} height={15}>
                <Circle cx={12} cy={12} r={10} fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1.2} />
                <Path d="M2 12h20M12 2c3 3 4 6 4 10s-1 7-4 10M12 2c-3 3-4 6-4 10s1 7 4 10" fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1} />
            </Svg>
        );
    }

    return (
        <Svg viewBox="0 0 24 24" width={15} height={15}>
            <Path d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z" fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1.2} />
            <Circle cx={12} cy={9} r={2.3} fill="none" stroke={CONTACT_ICON_COLOR} strokeWidth={1.2} />
        </Svg>
    );
}

function SectionHeader({ children }: { children: string }) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{children}</Text>
            <View style={styles.sectionRule}>
                <View style={styles.sectionNode} />
                <View style={styles.sectionLine} />
            </View>
        </View>
    );
}

export default function CvPdf({ language = 'en' }: { language?: CvLanguage }) {
    const data = cvData[language];
    const contacts = [
        { type: 'email' as const, value: data.contact.email, href: `mailto:${data.contact.email}` },
        { type: 'phone' as const, value: data.contact.phone, href: null },
        { type: 'github' as const, value: data.contact.github, href: `https://${data.contact.github}` },
        { type: 'website' as const, value: data.contact.website, href: `https://${data.contact.website}` },
        { type: 'location' as const, value: data.contact.location, href: null },
    ];

    return (
        <Document title={`${data.name} - CV (${language.toUpperCase()})`} author={data.name} language={language}>
            <Page size={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }} style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.summary}>{data.summary}</Text>
                    <Text style={styles.summary}>{data.pitch}</Text>
                    <View style={styles.contactGrid}>
                        {contacts.map(contact => (
                            <View key={contact.type} style={styles.contactItem}>
                                <View style={styles.contactIcon}>
                                    <ContactIcon type={contact.type} />
                                </View>
                                {contact.href ? (
                                    <Link style={styles.contactLink} src={contact.href}>
                                        {contact.value}
                                    </Link>
                                ) : (
                                    <Text style={styles.contactText}>{contact.value}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.section}>
                        <SectionHeader>{data.labels.skills}</SectionHeader>
                        {data.skills.map(skill => (
                            <Text key={skill.family} style={styles.skillItem}>
                                <Text style={styles.skillFamily}>•  {skill.family}: </Text>{skill.items}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <SectionHeader>{data.labels.experience}</SectionHeader>
                        {data.workExperience.map(work => (
                            <View key={work.company}>
                                <View style={styles.row}>
                                    <Text style={styles.workCompany}>{work.company}</Text>
                                    <Text style={styles.rowMeta}>{work.duration}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.workRole}>{work.role}</Text>
                                    <Text style={styles.rowMeta}>{work.location}</Text>
                                </View>
                                {work.highlights.map(highlight => (
                                    <Text key={highlight.label} style={styles.highlight}>
                                        <Text style={styles.highlightLabel}>•  {highlight.label}: </Text>{highlight.text}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <SectionHeader>{data.labels.projects}</SectionHeader>
                        {data.projects.map(project => (
                            <View key={project.name} style={styles.projectItem} wrap={false}>
                                <View style={styles.row}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    {project.link && (
                                        <Link style={styles.projectLink} src={project.link}>
                                            {project.link.replace('https://', '')}
                                        </Link>
                                    )}
                                </View>
                                <Text style={styles.projectDescription}>{project.description}</Text>
                                <Text style={styles.projectMeta}>{project.stack} | {project.duration}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <SectionHeader>{data.labels.certifications}</SectionHeader>
                        {data.certifications.map(certification => (
                            <Text
                                key={`${certification.issuer}-${certification.name}`}
                                style={styles.certificationItem}
                            >
                                <Text style={styles.certificationName}>•  {certification.name}</Text>{` — ${certification.issuer} | ${certification.date}`}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <SectionHeader>{data.labels.education}</SectionHeader>
                        {data.education.map(education => (
                            <View key={education.institution}>
                                <View style={styles.row}>
                                    <Text style={styles.educationInstitution}>{education.institution}</Text>
                                    <Text style={styles.rowMeta}>{education.duration}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.educationProgram}>{education.program}</Text>
                                    <Text style={styles.rowMeta}>{education.location}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <SectionHeader>{data.labels.languages}</SectionHeader>
                        <View style={styles.languageGrid}>
                            {data.languages.map(lang => (
                                <Text key={lang.name} style={styles.languageItem}>•  {lang.name} — {lang.level}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
