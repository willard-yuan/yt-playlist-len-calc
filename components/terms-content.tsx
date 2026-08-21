import { FileText, Scale, AlertCircle, Users, Zap, Shield } from "lucide-react";
import { type Locale } from "@/lib/i18n/dictionary";
import { getSubT } from "@/lib/i18n/subpages";

export function TermsContent({ locale }: { locale: Locale }) {
  const subT = getSubT(locale);

  return (
    <main>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse dark:from-purple-500/30 dark:to-blue-500/30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/30 dark:to-purple-500/30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500 dark:from-purple-500/20 dark:to-pink-500/20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {subT("terms.hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subT("terms.hero.sub")}
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
                <strong>{subT("terms.lastUpdated")}</strong> December 2024
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg shadow-md">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.agreement.title")}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {subT("terms.agreement.body")}
                  </p>
                </div>
              </div>
            </div>

            {/* Use License */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.license.title")}</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{subT("terms.license.body1")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{subT("terms.license.li1")}</li>
                      <li>{subT("terms.license.li2")}</li>
                      <li>{subT("terms.license.li3")}</li>
                      <li>{subT("terms.license.li4")}</li>
                    </ul>
                    <p>{subT("terms.license.body2")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg shadow-md">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.service.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{subT("terms.service.body1")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{subT("terms.service.li1")}</li>
                      <li>{subT("terms.service.li2")}</li>
                      <li>{subT("terms.service.li3")}</li>
                      <li>{subT("terms.service.li4")}</li>
                    </ul>
                    <p>{subT("terms.service.body2")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg shadow-md">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.responsibilities.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{subT("terms.responsibilities.body1")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{subT("terms.responsibilities.li1")}</li>
                      <li>{subT("terms.responsibilities.li2")}</li>
                      <li>{subT("terms.responsibilities.li3")}</li>
                      <li>{subT("terms.responsibilities.li4")}</li>
                      <li>{subT("terms.responsibilities.li5")}</li>
                      <li>{subT("terms.responsibilities.li6")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg shadow-md">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.disclaimer.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{subT("terms.disclaimer.body1")}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{subT("terms.disclaimer.li1")}</li>
                      <li>{subT("terms.disclaimer.li2")}</li>
                      <li>{subT("terms.disclaimer.li3")}</li>
                      <li>{subT("terms.disclaimer.li4")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.limitations.title")}</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>{subT("terms.limitations.body1")}</p>
                <p>{subT("terms.limitations.body2")}</p>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.privacy.title")}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{subT("terms.privacy.body1")}</p>
                    <p>{subT("terms.privacy.body2")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.governing.title")}</h2>
              <div className="text-muted-foreground">
                <p>{subT("terms.governing.body")}</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.changes.title")}</h2>
              <div className="text-muted-foreground">
                <p>{subT("terms.changes.body")}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{subT("terms.contact.title")}</h2>
              <div className="text-muted-foreground">
                <p className="mb-4">{subT("terms.contact.body")}</p>
                <ul className="space-y-2">
                  <li><strong>{subT("terms.contact.email")}</strong> legal@ytplaylistcalc.com</li>
                  <li><strong>{subT("terms.contact.website")}</strong> {subT("terms.contact.websiteValue")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
