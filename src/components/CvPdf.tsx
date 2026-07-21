'use client';

import {
    Circle,
    Document,
    Font,
    Image,
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
const SIDEBAR_WIDTH = 260;

const styles = StyleSheet.create({
    page: {
        position: 'relative',
        width: PAGE_WIDTH,
        minWidth: PAGE_WIDTH,
        maxWidth: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        minHeight: PAGE_HEIGHT,
        maxHeight: PAGE_HEIGHT,
        fontFamily: activeFont.family,
        fontSize: 9,
        color: '#111111',
        backgroundColor: '#ffffff',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SIDEBAR_WIDTH,
        height: PAGE_HEIGHT,
        paddingTop: 36,
        paddingHorizontal: 30,
        paddingBottom: 24,
        color: '#ffffff',
        backgroundColor: '#000000',
    },
    main: {
        marginLeft: SIDEBAR_WIDTH,
        width: PAGE_WIDTH - SIDEBAR_WIDTH,
        paddingTop: 9,
        paddingLeft: 7,
        paddingRight: 0,
        paddingBottom: 12,
    },
    watermark: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 14,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.82,
    },
    watermarkText: {
        fontSize: 7.5,
        fontStyle: 'italic',
        color: '#363636',
        marginRight: 4,
    },
    watermarkIcon: {
        width: 12,
        height: 12,
        marginRight: 5,
        objectFit: 'contain',
    },
    watermarkEdge: {
        width: 1,
        height: 14,
        backgroundColor: '#363636',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        fontSize: 9,
        color: '#d0d0d0',
        marginBottom: 20,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 24,
        marginBottom: 6,
    },
    contactIcon: {
        width: 24,
        marginRight: 10,
        alignItems: 'center',
    },
    contactText: {
        fontSize: 10,
        color: '#eeeeee',
    },
    sidebarHeading: {
        fontSize: 12.5,
        fontWeight: 'normal',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 12,
    },
    skillItem: {
        fontSize: 9.6,
        fontWeight: 'bold',
        marginBottom: 8,
        paddingLeft: 8,
    },
    sidebarItem: {
        fontSize: 9.5,
        marginBottom: 7,
        paddingLeft: 8,
    },
    sidebarBottom: {
        position: 'absolute',
        left: 30,
        right: 30,
        bottom: 32,
    },
    sectionHeader: {
        marginBottom: 7,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: 'normal',
        textAlign: 'right',
        paddingRight: 9,
        marginBottom: 2,
    },
    sectionRule: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionNode: {
        width: 8,
        height: 8,
        marginLeft: 63,
        borderRadius: 4,
        backgroundColor: '#666666',
    },
    sectionLine: {
        flexGrow: 1,
        height: 1,
        backgroundColor: '#111111',
    },
    sectionContent: {
        paddingLeft: 5,
        paddingRight: 7,
    },
    workCompany: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    workMeta: {
        fontSize: 8.5,
        fontStyle: 'italic',
        color: '#444444',
        marginBottom: 1,
    },
    workRole: {
        fontSize: 8.7,
        fontStyle: 'italic',
        color: '#333333',
        marginBottom: 6,
    },
    highlight: {
        fontSize: 8.7,
        lineHeight: 1.28,
        marginBottom: 8,
        paddingLeft: 9,
    },
    highlightLabel: {
        fontWeight: 'bold',
    },
    projectItem: {
        marginBottom: 7,
    },
    projectName: {
        fontSize: 9.5,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    projectDescription: {
        fontSize: 8.3,
        lineHeight: 1.22,
        color: '#222222',
        marginBottom: 1,
    },
    projectMeta: {
        fontSize: 8,
        fontStyle: 'italic',
        color: '#444444',
        marginBottom: 1,
    },
    projectLink: {
        fontSize: 8,
        fontStyle: 'italic',
        color: '#4d70ff',
        textDecoration: 'underline',
    },
    educationInstitution: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    educationMeta: {
        fontSize: 8.5,
        fontStyle: 'italic',
        color: '#444444',
        marginBottom: 1,
    },
    educationProgram: {
        fontSize: 8.7,
        fontStyle: 'italic',
    },
    certificationItem: {
        fontSize: 8.5,
        lineHeight: 1.2,
        marginBottom: 4,
        paddingLeft: 8,
    },
});

function ContactIcon({ type }: { type: 'phone' | 'email' | 'website' | 'location' }) {
    if (type === 'phone') {
        return (
            <Svg viewBox="0 0 24 24" width={17} height={17}>
                <Path d="M7 2h10v20H7z" fill="none" stroke="#ffffff" strokeWidth={1.2} />
                <Path d="M10 4h4M11 20h2" fill="none" stroke="#ffffff" strokeWidth={1} />
            </Svg>
        );
    }

    if (type === 'email') {
        return (
            <Svg viewBox="0 0 24 24" width={18} height={18}>
                <Rect x={2} y={5} width={20} height={14} fill="none" stroke="#ffffff" strokeWidth={1.2} />
                <Path d="M2 6l10 8 10-8" fill="none" stroke="#ffffff" strokeWidth={1.2} />
            </Svg>
        );
    }

    if (type === 'website') {
        return (
            <Svg viewBox="0 0 24 24" width={19} height={19}>
                <Circle cx={12} cy={12} r={10} fill="none" stroke="#ffffff" strokeWidth={1.2} />
                <Path d="M2 12h20M12 2c3 3 4 6 4 10s-1 7-4 10M12 2c-3 3-4 6-4 10s1 7 4 10" fill="none" stroke="#ffffff" strokeWidth={1} />
            </Svg>
        );
    }

    return (
        <Svg viewBox="0 0 24 24" width={19} height={19}>
            <Path d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z" fill="none" stroke="#ffffff" strokeWidth={1.2} />
            <Circle cx={12} cy={9} r={2.3} fill="none" stroke="#ffffff" strokeWidth={1.2} />
        </Svg>
    );
}

function getDailyQuote<T>(quotes: readonly T[]) {
    const mondayBasedDay = (new Date().getDay() + 6) % 7;
    return quotes[mondayBasedDay % quotes.length];
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
    const dailyQuote = getDailyQuote(cvAppearance.watermark.quotes);
    const contacts = [
        { type: 'phone' as const, value: data.contact.phone },
        { type: 'email' as const, value: data.contact.email },
        { type: 'website' as const, value: data.contact.website },
        { type: 'location' as const, value: data.contact.location },
    ];

    return (
        <Document title={`${data.name} - CV (${language.toUpperCase()})`} author={data.name} language={language}>
            <Page size={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }} style={styles.page} wrap={false}>
                {cvAppearance.watermark.enabled && (
                    <View style={styles.watermark}>
                        <Text style={styles.watermarkText}>{dailyQuote.text}</Text>
                        <Image style={styles.watermarkIcon} src={dailyQuote.icon} />
                    </View>
                )}

                <View style={styles.sidebar}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.title}>{data.title}</Text>

                    {contacts.map(contact => (
                        <View key={contact.type} style={styles.contactRow}>
                            <View style={styles.contactIcon}><ContactIcon type={contact.type} /></View>
                            <Text style={styles.contactText}>{contact.value}</Text>
                        </View>
                    ))}

                    <Text style={styles.sidebarHeading}>{data.labels.skills}</Text>
                    {data.skills.map(skill => (
                        <Text key={skill} style={styles.skillItem}>•  {skill}</Text>
                    ))}

                    <View style={styles.sidebarBottom}>
                        <Text style={styles.sidebarHeading}>{data.labels.languages}</Text>
                        {data.languages.map(lang => (
                            <Text key={lang.name} style={styles.sidebarItem}>•  {lang.name} - {lang.level}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.main}>
                    <SectionHeader>{data.labels.experience}</SectionHeader>
                    <View style={styles.sectionContent}>
                        {data.workExperience.map(work => (
                            <View key={work.company}>
                                <Text style={styles.workCompany}>{work.company}</Text>
                                <Text style={styles.workMeta}>{work.location} | {work.duration}</Text>
                                <Text style={styles.workRole}>{work.role}</Text>
                                {work.highlights.map(highlight => (
                                    <Text key={highlight.label} style={styles.highlight}>
                                        <Text style={styles.highlightLabel}>•  {highlight.label}: </Text>{highlight.text}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>

                    <SectionHeader>{data.labels.projects}</SectionHeader>
                    <View style={styles.sectionContent}>
                        {data.projects.map(project => (
                            <View key={project.name} style={styles.projectItem}>
                                <Text style={styles.projectName}>{project.name}</Text>
                                <Text style={styles.projectDescription}>{project.description}</Text>
                                <Text style={styles.projectMeta}>{project.stack} | {project.duration}</Text>
                                {project.link && (
                                    <Link style={styles.projectLink} src={project.link}>{project.link.replace('https://', '')}</Link>
                                )}
                            </View>
                        ))}
                    </View>

                    <SectionHeader>{data.labels.certifications}</SectionHeader>
                    <View style={styles.sectionContent}>
                        {data.certifications.map(certification => (
                            <Text key={certification} style={styles.certificationItem}>•  {certification}</Text>
                        ))}
                    </View>

                    <SectionHeader>{data.labels.education}</SectionHeader>
                    <View style={styles.sectionContent}>
                        {data.education.map(education => (
                            <View key={education.institution}>
                                <Text style={styles.educationInstitution}>{education.institution}</Text>
                                <Text style={styles.educationMeta}>{education.location} | {education.duration}</Text>
                                <Text style={styles.educationProgram}>{education.program}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
