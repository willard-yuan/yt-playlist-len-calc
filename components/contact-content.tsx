import { Mail, MessageSquare, Send, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getT, type Locale } from "@/lib/i18n/dictionary"

export function ContactContent({ locale }: { locale: Locale }) {
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
              {t("contact.hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t("contact.form.title")}
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-2">
                        {t("contact.form.firstName")}
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder={t("contact.form.firstNamePlaceholder")}
                        className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-2">
                        {t("contact.form.lastName")}
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder={t("contact.form.lastNamePlaceholder")}
                        className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                      {t("contact.form.email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                      {t("contact.form.subject")}
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder={t("contact.form.subjectPlaceholder")}
                      className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder={t("contact.form.messagePlaceholder")}
                      className="bg-background/50 border-border focus:border-purple-500 text-foreground resize-none"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 shadow-lg">
                    <Send className="h-5 w-5 mr-2" />
                    {t("contact.form.submit")}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {t("contact.info.title")}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t("contact.info.desc")}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg shadow-md">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">{t("contact.info.email.title")}</h3>
                      <p className="text-muted-foreground">{t("contact.info.email.value")}</p>
                      <p className="text-muted-foreground text-sm mt-1">{t("contact.info.email.note")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">{t("contact.info.chat.title")}</h3>
                      <p className="text-muted-foreground">{t("contact.info.chat.value")}</p>
                      <p className="text-muted-foreground text-sm mt-1">{t("contact.info.chat.note")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">{t("contact.info.github.title")}</h3>
                      <p className="text-muted-foreground">{t("contact.info.github.value")}</p>
                      <p className="text-muted-foreground text-sm mt-1">{t("contact.info.github.note")}</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {t("contact.faq.title")}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{t("contact.faq.q1")}</h4>
                      <p className="text-muted-foreground text-sm">{t("contact.faq.a1")}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{t("contact.faq.q2")}</h4>
                      <p className="text-muted-foreground text-sm">{t("contact.faq.a2")}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{t("contact.faq.q3")}</h4>
                      <p className="text-muted-foreground text-sm">{t("contact.faq.a3")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
