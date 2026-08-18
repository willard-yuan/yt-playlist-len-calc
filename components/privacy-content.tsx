import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react"
import { getT, type Locale } from "@/lib/i18n/dictionary"

export function PrivacyContent({ locale }: { locale: Locale }) {
  const t = getT(locale)

  return (
    <main>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse dark:from-purple-500/30 dark:to-blue-500/30"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/30 dark:to-purple-500/30"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000 dark:from-purple-500/30 dark:to-pink-500/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("privacy.hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("privacy.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Last Updated */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
              <p className="text-muted-foreground">
                <strong>{t("privacy.lastUpdatedLabel")}</strong> {t("privacy.lastUpdatedDate")}
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg shadow-md">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.intro.title")}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.intro.body")}
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.collect.title")}</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t("privacy.collect.providedTitle")}</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>{t("privacy.collect.provided.1")}</li>
                        <li>{t("privacy.collect.provided.2")}</li>
                        <li>{t("privacy.collect.provided.3")}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t("privacy.collect.autoTitle")}</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>{t("privacy.collect.auto.1")}</li>
                        <li>{t("privacy.collect.auto.2")}</li>
                        <li>{t("privacy.collect.auto.3")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.use.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{t("privacy.use.intro")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{t("privacy.use.1")}</li>
                      <li>{t("privacy.use.2")}</li>
                      <li>{t("privacy.use.3")}</li>
                      <li>{t("privacy.use.4")}</li>
                      <li>{t("privacy.use.5")}</li>
                      <li>{t("privacy.use.6")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg shadow-md">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.protection.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{t("privacy.protection.intro")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{t("privacy.protection.1")}</li>
                      <li>{t("privacy.protection.2")}</li>
                      <li>{t("privacy.protection.3")}</li>
                      <li>{t("privacy.protection.4")}</li>
                      <li>{t("privacy.protection.5")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.sharing.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{t("privacy.sharing.intro")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{t("privacy.sharing.1")}</li>
                      <li>{t("privacy.sharing.2")}</li>
                      <li>{t("privacy.sharing.3")}</li>
                      <li>{t("privacy.sharing.4")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg shadow-md">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.rights.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{t("privacy.rights.intro")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{t("privacy.rights.1")}</li>
                      <li>{t("privacy.rights.2")}</li>
                      <li>{t("privacy.rights.3")}</li>
                      <li>{t("privacy.rights.4")}</li>
                      <li>{t("privacy.rights.5")}</li>
                      <li>{t("privacy.rights.6")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.cookies.title")}</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  {t("privacy.cookies.p1")}
                </p>
                <p>
                  {t("privacy.cookies.p2")}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t("privacy.contact.title")}</h2>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  {t("privacy.contact.intro")}
                </p>
                <ul className="space-y-2">
                  <li><strong>{t("privacy.contact.emailLabel")}</strong> {t("privacy.contact.emailValue")}</li>
                  <li><strong>{t("privacy.contact.websiteLabel")}</strong> {t("privacy.contact.websiteValue")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
