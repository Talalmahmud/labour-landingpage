"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  ExternalLink,
  HardHat,
  LogOut,
  Loader2,
  Mail,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrayEditor } from "@/components/admin/array-editor";
import { BlogPanel } from "@/components/admin/blog-panel";
import { IconLibraryPanel } from "@/components/admin/icon-library-panel";
import { Field } from "@/components/admin/field";
import { IconPicker } from "@/components/admin/icon-picker";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { ContactMessageDTO } from "@/lib/messages";
import type { LabourRequestDTO } from "@/lib/requests";
import type { WorkerApplicationDTO } from "@/lib/worker-applications";
import type { RoleTone, SiteContent } from "@/lib/content-types";

interface AdminDashboardProps {
  initialContent: SiteContent;
}

type SaveState = "idle" | "saving" | "saved" | "error";

const ROLE_TONE_LABELS: Record<RoleTone, string> = {
  blue: "Blue",
  green: "Green",
  amber: "Amber",
};

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingCount, setUploadingCount] = useState(0);

  const trackUploading = (uploading: boolean) =>
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));

  const updateSeo = (patch: Partial<SiteContent["seo"]>) =>
    setContent((c) => ({ ...c, seo: { ...c.seo, ...patch } }));
  const updateSiteSettings = (patch: Partial<SiteContent["siteSettings"]>) =>
    setContent((c) => ({
      ...c,
      siteSettings: { ...c.siteSettings, ...patch },
    }));
  const updateHero = (patch: Partial<SiteContent["hero"]>) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  const updateServicesMeta = (
    patch: Partial<Omit<SiteContent["services"], "items">>,
  ) => setContent((c) => ({ ...c, services: { ...c.services, ...patch } }));
  const updateRequestSection = (
    patch: Partial<Omit<SiteContent["requestSection"], "steps">>,
  ) =>
    setContent((c) => ({
      ...c,
      requestSection: { ...c.requestSection, ...patch },
    }));
  const updateFindLabourMeta = (
    patch: Partial<Omit<SiteContent["findLabour"], "workers" | "mapPins">>,
  ) => setContent((c) => ({ ...c, findLabour: { ...c.findLabour, ...patch } }));
  const updateReviewsMeta = (
    patch: Partial<Omit<SiteContent["reviews"], "items">>,
  ) => setContent((c) => ({ ...c, reviews: { ...c.reviews, ...patch } }));
  const updateChoosePathMeta = (
    patch: Partial<
      Omit<SiteContent["choosePath"], "hireLabour" | "becomeLabour">
    >,
  ) => setContent((c) => ({ ...c, choosePath: { ...c.choosePath, ...patch } }));
  const updateHireLabourCard = (
    patch: Partial<SiteContent["choosePath"]["hireLabour"]>,
  ) =>
    setContent((c) => ({
      ...c,
      choosePath: {
        ...c.choosePath,
        hireLabour: { ...c.choosePath.hireLabour, ...patch },
      },
    }));
  const updateBecomeLabourCard = (
    patch: Partial<SiteContent["choosePath"]["becomeLabour"]>,
  ) =>
    setContent((c) => ({
      ...c,
      choosePath: {
        ...c.choosePath,
        becomeLabour: { ...c.choosePath.becomeLabour, ...patch },
      },
    }));
  const updateMissionVisionMeta = (
    patch: Partial<Omit<SiteContent["missionVision"], "values">>,
  ) =>
    setContent((c) => ({
      ...c,
      missionVision: { ...c.missionVision, ...patch },
    }));
  const updateContact = (patch: Partial<SiteContent["contact"]>) =>
    setContent((c) => ({ ...c, contact: { ...c.contact, ...patch } }));
  const updateAboutPage = (
    patch: Partial<Omit<SiteContent["aboutPage"], "stats" | "team">>,
  ) => setContent((c) => ({ ...c, aboutPage: { ...c.aboutPage, ...patch } }));
  const updateContactPage = (
    patch: Partial<Omit<SiteContent["contactPage"], "branches">>,
  ) => setContent((c) => ({ ...c, contactPage: { ...c.contactPage, ...patch } }));
  const updateServicesPage = (patch: Partial<SiteContent["servicesPage"]>) =>
    setContent((c) => ({
      ...c,
      servicesPage: { ...c.servicesPage, ...patch },
    }));
  const updateFindLabourPage = (
    patch: Partial<SiteContent["findLabourPage"]>,
  ) =>
    setContent((c) => ({
      ...c,
      findLabourPage: { ...c.findLabourPage, ...patch },
    }));
  const updateBlogPage = (patch: Partial<SiteContent["blogPage"]>) =>
    setContent((c) => ({ ...c, blogPage: { ...c.blogPage, ...patch } }));
  const updateBecomeLabourPage = (
    patch: Partial<SiteContent["becomeLabourPage"]>,
  ) =>
    setContent((c) => ({
      ...c,
      becomeLabourPage: { ...c.becomeLabourPage, ...patch },
    }));
  const updateHowItWorksPage = (
    patch: Partial<Omit<SiteContent["howItWorksPage"], "videos">>,
  ) =>
    setContent((c) => ({
      ...c,
      howItWorksPage: { ...c.howItWorksPage, ...patch },
    }));
  const updateLabourRequestPage = (
    patch: Partial<SiteContent["labourRequestPage"]>,
  ) =>
    setContent((c) => ({
      ...c,
      labourRequestPage: { ...c.labourRequestPage, ...patch },
    }));

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to save changes");
      }
      setSaveState("saved");
      router.refresh();
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2500);
    } catch (err) {
      setSaveState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to save changes",
      );
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-16">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex not-even: items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-950 text-white">
              <HardHat className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="font-heading text-sm font-semibold"> Admin</p>
              <p className="text-xs text-muted-foreground">
                Manage your site content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveState === "saved" && (
              <span className="text-sm text-emerald-600">Saved</span>
            )}
            {saveState === "error" && (
              <span className="text-sm text-destructive">{errorMessage}</span>
            )}
            {uploadingCount > 0 && (
              <span className="text-sm text-muted-foreground">
                Uploading image…
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              nativeButton={false}
              render={<a href="/" target="_blank" />}
            >
              <ExternalLink className="size-3.5" />
              View Site
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={handleLogout}
            >
              <LogOut className="size-3.5" />
              Logout
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-blue-950 text-white hover:bg-blue-900"
              onClick={handleSave}
              disabled={saveState === "saving" || uploadingCount > 0}
            >
              {saveState === "saving" && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className=" px-6 pb-8">
        <Tabs
          defaultValue="hero"
          orientation="vertical"
          className="flex-col items-start gap-6 lg:flex-row lg:gap-8"
        >
          <TabsList className="w-full items-stretch lg:w-56 lg:shrink-0 lg:self-start lg:sticky lg:top-24 lg:max-h-screen lg:overflow-y-auto">
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="site-settings"
            >
              Site Settings
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="seo">
              SEO
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="icon-library">
              Icon Library
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="hero">
              Hero
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="services">
              Services
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="steps">
              Steps
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="workers">
              Workers
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="trust">
              Trust Points
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="reviews">
              Reviews
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="choose-path">
              Choose Path
            </TabsTrigger>
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="mission-vision"
            >
              Mission & Vision
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="contact-bar">
              Contact Bar
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="about-page">
              About Page
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="contact-page">
              Contact Page
            </TabsTrigger>
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="services-page"
            >
              Services Page
            </TabsTrigger>
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="find-labour-page"
            >
              Find Labour Page
            </TabsTrigger>
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="become-labour-page"
            >
              Become Labour Page
            </TabsTrigger>
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="how-it-works-page"
            >
              How It Works Page
            </TabsTrigger>
            <TabsTrigger
              className=" hover:cursor-pointer"
              value="labour-request-page"
            >
              Labour Request Page
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="blog">
              Blog
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="requests">
              Requests
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="applications">
              Applications
            </TabsTrigger>
            <TabsTrigger className=" hover:cursor-pointer" value="messages">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="site-settings">
            <Card>
              <p className="text-xs text-muted-foreground">
                The logo and site name shown in the navbar across every page.
              </p>
              <Field label="Logo">
                <ImageUploadField
                  value={content.siteSettings.logoPublicId}
                  onChange={(logoPublicId) =>
                    updateSiteSettings({ logoPublicId })
                  }
                  onUploadingChange={trackUploading}
                  hint="Falls back to the default icon when no logo is set."
                  previewTransform="f_auto,q_auto,w_160,h_160,c_fit"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Site Name">
                  <Input
                    value={content.siteSettings.siteName}
                    onChange={(e) =>
                      updateSiteSettings({ siteName: e.target.value })
                    }
                  />
                </Field>
                <Field label="Tagline">
                  <Input
                    value={content.siteSettings.tagline}
                    onChange={(e) =>
                      updateSiteSettings({ tagline: e.target.value })
                    }
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <p className="text-xs text-muted-foreground">
                Controls the browser tab title, search engine listing, favicon,
                and the preview card shown when your site is shared on social
                media or messaging apps.
              </p>

              <Field label="Meta Title">
                <Input
                  value={content.seo.metaTitle}
                  onChange={(e) => updateSeo({ metaTitle: e.target.value })}
                />
              </Field>
              <Field label="Meta Description">
                <Textarea
                  value={content.seo.metaDescription}
                  onChange={(e) =>
                    updateSeo({ metaDescription: e.target.value })
                  }
                  className="min-h-16 resize-none"
                />
              </Field>
              <Field label="Keywords">
                <Input
                  value={content.seo.keywords}
                  onChange={(e) => updateSeo({ keywords: e.target.value })}
                  placeholder="Comma-separated, e.g. labour, workers, hire labour"
                />
              </Field>

              <div className="grid grid-cols-1 gap-6 border-t border-border pt-5 sm:grid-cols-2">
                <Field label="Favicon">
                  <ImageUploadField
                    value={content.seo.faviconPublicId}
                    onChange={(faviconPublicId) =>
                      updateSeo({ faviconPublicId })
                    }
                    onUploadingChange={trackUploading}
                    hint="Falls back to the default site icon. Square image recommended."
                    previewTransform="f_auto,q_auto,w_128,h_128,c_fit"
                  />
                </Field>
                <Field label="Social Share Image (OG Image)">
                  <ImageUploadField
                    value={content.seo.ogImagePublicId}
                    onChange={(ogImagePublicId) =>
                      updateSeo({ ogImagePublicId })
                    }
                    onUploadingChange={trackUploading}
                    hint="Shown when your site is shared. Recommended size 1200×630."
                    previewTransform="f_auto,q_auto,w_320,h_168,c_fill"
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="icon-library">
            <IconLibraryPanel />
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <Field label="Hero Image">
                <ImageUploadField
                  value={content.hero.imagePublicId}
                  onChange={(imagePublicId) => updateHero({ imagePublicId })}
                  onUploadingChange={trackUploading}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Title Line 1">
                  <Input
                    value={content.hero.titleLine1}
                    onChange={(e) => updateHero({ titleLine1: e.target.value })}
                  />
                </Field>
                <Field label="Title Line 2">
                  <Input
                    value={content.hero.titleLine2}
                    onChange={(e) => updateHero({ titleLine2: e.target.value })}
                  />
                </Field>
                <Field label="Title Highlight">
                  <Input
                    value={content.hero.titleHighlight}
                    onChange={(e) =>
                      updateHero({ titleHighlight: e.target.value })
                    }
                  />
                </Field>
              </div>

              <Field label="Subtitle">
                <Textarea
                  value={content.hero.subtitle}
                  onChange={(e) => updateHero({ subtitle: e.target.value })}
                  className="min-h-16 resize-none"
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Primary CTA">
                  <Input
                    value={content.hero.ctaPrimary}
                    onChange={(e) => updateHero({ ctaPrimary: e.target.value })}
                  />
                </Field>
                <Field label="Secondary CTA">
                  <Input
                    value={content.hero.ctaSecondary}
                    onChange={(e) =>
                      updateHero({ ctaSecondary: e.target.value })
                    }
                  />
                </Field>
                <Field
                  label="How It Works Video (YouTube URL)"
                  className="sm:col-span-2"
                >
                  <Input
                    value={content.hero.howItWorksVideoUrl}
                    onChange={(e) =>
                      updateHero({ howItWorksVideoUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </Field>
                <Field label="Rating Value">
                  <Input
                    value={content.hero.ratingValue}
                    onChange={(e) =>
                      updateHero({ ratingValue: e.target.value })
                    }
                  />
                </Field>
                <Field label="Rating Label">
                  <Input
                    value={content.hero.ratingLabel}
                    onChange={(e) =>
                      updateHero({ ratingLabel: e.target.value })
                    }
                  />
                </Field>
                <Field label="Search Heading">
                  <Input
                    value={content.hero.searchHeading}
                    onChange={(e) =>
                      updateHero({ searchHeading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Search Placeholder">
                  <Input
                    value={content.hero.searchPlaceholder}
                    onChange={(e) =>
                      updateHero({ searchPlaceholder: e.target.value })
                    }
                  />
                </Field>
                <Field label="Search Button Label">
                  <Input
                    value={content.hero.searchButton}
                    onChange={(e) =>
                      updateHero({ searchButton: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Stats</SectionTitle>
              <ArrayEditor
                items={content.hero.stats}
                onChange={(stats) => updateHero({ stats })}
                newItem={() => ({
                  icon: "zap",
                  value: "0",
                  label: "New stat",
                  sublabel: "",
                })}
                addLabel="Add stat"
                minItems={1}
                renderItem={(stat, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <Field label="Icon">
                      <IconPicker
                        value={stat.icon}
                        onChange={(icon) => update({ icon })}
                      />
                    </Field>
                    <Field label="Value">
                      <Input
                        value={stat.value}
                        onChange={(e) => update({ value: e.target.value })}
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={stat.label}
                        onChange={(e) => update({ label: e.target.value })}
                      />
                    </Field>
                    <Field label="Sublabel">
                      <Input
                        value={stat.sublabel}
                        onChange={(e) => update({ sublabel: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Feature Badges</SectionTitle>
              <p className="-mt-3 text-xs text-muted-foreground">
                The small pills shown under the hero buttons (e.g.
                &quot;Verified Workers&quot;).
              </p>
              <ArrayEditor
                items={content.hero.badges}
                onChange={(badges) => updateHero({ badges })}
                newItem={() => ({ icon: "shield-check", label: "New Badge" })}
                addLabel="Add badge"
                minItems={0}
                renderItem={(badge, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Icon">
                      <IconPicker
                        value={badge.icon}
                        onChange={(icon) => update({ icon })}
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={badge.label}
                        onChange={(e) => update({ label: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Gallery Photos</SectionTitle>
              <p className="-mt-3 text-xs text-muted-foreground">
                The small worker photos shown under the hero image.
              </p>
              <div className="flex flex-wrap gap-3">
                {content.hero.galleryImagePublicIds.map((publicId, index) => (
                  <ImageUploadField
                    key={index}
                    value={publicId}
                    onChange={(next) =>
                      updateHero({
                        galleryImagePublicIds:
                          content.hero.galleryImagePublicIds.map((p, i) =>
                            i === index ? next : p,
                          ),
                      })
                    }
                    onUploadingChange={trackUploading}
                    hint=""
                    previewTransform="f_auto,q_auto,w_160,h_160,c_fill,g_auto"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-fit gap-1.5"
                  onClick={() =>
                    updateHero({
                      galleryImagePublicIds: [
                        ...content.hero.galleryImagePublicIds,
                        null,
                      ],
                    })
                  }
                >
                  Add photo slot
                </Button>
                {content.hero.galleryImagePublicIds.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-fit gap-1.5 text-destructive"
                    onClick={() =>
                      updateHero({
                        galleryImagePublicIds:
                          content.hero.galleryImagePublicIds.slice(0, -1),
                      })
                    }
                  >
                    Remove last slot
                  </Button>
                )}
              </div>

              <SectionTitle>Popular Searches</SectionTitle>
              <TagListEditor
                items={content.hero.popularSearches}
                onChange={(popularSearches) => updateHero({ popularSearches })}
              />
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Section Heading">
                  <Input
                    value={content.services.heading}
                    onChange={(e) =>
                      updateServicesMeta({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Section Subheading">
                  <Input
                    value={content.services.subheading}
                    onChange={(e) =>
                      updateServicesMeta({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Services</SectionTitle>
              <ArrayEditor
                items={content.services.items}
                onChange={(items) =>
                  setContent((c) => ({
                    ...c,
                    services: { ...c.services, items },
                  }))
                }
                newItem={() => ({
                  icon: "",
                  imagePublicId: null,
                  title: "New Service",
                  description: "Description",
                })}
                addLabel="Add service"
                minItems={1}
                renderItem={(service, update) => (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ImageUploadField
                      value={service.imagePublicId}
                      onChange={(imagePublicId) => update({ imagePublicId })}
                      onUploadingChange={trackUploading}
                      hint="Shown on the homepage and services page grids."
                      previewTransform="f_auto,q_auto,w_160,h_160,c_fill,g_auto"
                    />
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Title">
                        <Input
                          value={service.title}
                          onChange={(e) => update({ title: e.target.value })}
                        />
                      </Field>
                      <Field label="Description">
                        <Input
                          value={service.description}
                          onChange={(e) =>
                            update({ description: e.target.value })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="steps">
            <Card>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading Line 1">
                  <Input
                    value={content.requestSection.headingLine1}
                    onChange={(e) =>
                      updateRequestSection({ headingLine1: e.target.value })
                    }
                  />
                </Field>
                <Field label="Heading Highlight">
                  <Input
                    value={content.requestSection.headingHighlight}
                    onChange={(e) =>
                      updateRequestSection({ headingHighlight: e.target.value })
                    }
                  />
                </Field>
                <Field label="Form Heading">
                  <Input
                    value={content.requestSection.formHeading}
                    onChange={(e) =>
                      updateRequestSection({ formHeading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Submit Button Label">
                  <Input
                    value={content.requestSection.submitLabel}
                    onChange={(e) =>
                      updateRequestSection({ submitLabel: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Steps</SectionTitle>
              <ArrayEditor
                items={content.requestSection.steps}
                onChange={(steps) =>
                  setContent((c) => ({
                    ...c,
                    requestSection: { ...c.requestSection, steps },
                  }))
                }
                newItem={() => ({
                  title: "New Step",
                  description: "Description",
                })}
                addLabel="Add step"
                minItems={1}
                renderItem={(step, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <Input
                        value={step.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="Description">
                      <Input
                        value={step.description}
                        onChange={(e) =>
                          update({ description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="workers">
            <Card>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Section Heading">
                  <Input
                    value={content.findLabour.heading}
                    onChange={(e) =>
                      updateFindLabourMeta({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Section Subheading">
                  <Input
                    value={content.findLabour.subheading}
                    onChange={(e) =>
                      updateFindLabourMeta({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Workers</SectionTitle>
              <ArrayEditor
                items={content.findLabour.workers}
                onChange={(workers) =>
                  setContent((c) => ({
                    ...c,
                    findLabour: { ...c.findLabour, workers },
                  }))
                }
                newItem={() => ({
                  name: "New Worker",
                  role: "Helper",
                  roleTone: "blue" as RoleTone,
                  rating: 4.5,
                  experience: "1 year experience",
                  location: "Dhaka",
                })}
                addLabel="Add worker"
                minItems={0}
                renderItem={(worker, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Name">
                      <Input
                        value={worker.name}
                        onChange={(e) => update({ name: e.target.value })}
                      />
                    </Field>
                    <Field label="Role">
                      <Input
                        value={worker.role}
                        onChange={(e) => update({ role: e.target.value })}
                      />
                    </Field>
                    <Field label="Role Color">
                      <Select
                        value={worker.roleTone}
                        onValueChange={(v) =>
                          v && update({ roleTone: v as RoleTone })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>
                            {(v: RoleTone) => ROLE_TONE_LABELS[v] ?? v}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="amber">Amber</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Rating">
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={worker.rating}
                        onChange={(e) =>
                          update({ rating: Number(e.target.value) })
                        }
                      />
                    </Field>
                    <Field label="Experience">
                      <Input
                        value={worker.experience}
                        onChange={(e) => update({ experience: e.target.value })}
                      />
                    </Field>
                    <Field label="Location">
                      <Input
                        value={worker.location}
                        onChange={(e) => update({ location: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Map Pins</SectionTitle>
              <ArrayEditor
                items={content.findLabour.mapPins}
                onChange={(mapPins) =>
                  setContent((c) => ({
                    ...c,
                    findLabour: { ...c.findLabour, mapPins },
                  }))
                }
                newItem={() => ({ label: "New Area", top: "50%", left: "50%" })}
                addLabel="Add pin"
                minItems={0}
                renderItem={(pin, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Label">
                      <Input
                        value={pin.label}
                        onChange={(e) => update({ label: e.target.value })}
                      />
                    </Field>
                    <Field label="Top (%)">
                      <Input
                        value={pin.top}
                        onChange={(e) => update({ top: e.target.value })}
                      />
                    </Field>
                    <Field label="Left (%)">
                      <Input
                        value={pin.left}
                        onChange={(e) => update({ left: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="trust">
            <Card>
              <SectionTitle>Trust Points</SectionTitle>
              <ArrayEditor
                items={content.trustPoints}
                onChange={(trustPoints) =>
                  setContent((c) => ({ ...c, trustPoints }))
                }
                newItem={() => ({
                  icon: "shield-check",
                  title: "New Point",
                  description: "Description",
                })}
                addLabel="Add trust point"
                minItems={1}
                renderItem={(point, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker
                        value={point.icon}
                        onChange={(icon) => update({ icon })}
                      />
                    </Field>
                    <Field label="Title">
                      <Input
                        value={point.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="Description">
                      <Input
                        value={point.description}
                        onChange={(e) =>
                          update({ description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <p className="text-xs text-muted-foreground">
                Reviews from hirers, shown as a sliding carousel on the
                homepage.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.reviews.heading}
                    onChange={(e) =>
                      updateReviewsMeta({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.reviews.subheading}
                    onChange={(e) =>
                      updateReviewsMeta({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Reviews</SectionTitle>
              <ArrayEditor
                items={content.reviews.items}
                onChange={(items) =>
                  setContent((c) => ({
                    ...c,
                    reviews: { ...c.reviews, items },
                  }))
                }
                newItem={() => ({
                  name: "New Reviewer",
                  role: "Homeowner",
                  rating: 5,
                  review: "Great experience hiring through Shromik.",
                  avatarPublicId: null,
                })}
                addLabel="Add review"
                minItems={0}
                renderItem={(review, update) => (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ImageUploadField
                      value={review.avatarPublicId}
                      onChange={(avatarPublicId) => update({ avatarPublicId })}
                      onUploadingChange={trackUploading}
                      hint="Falls back to initials when no photo is set."
                      previewTransform="f_auto,q_auto,w_160,h_160,c_fill,g_face"
                    />
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Name">
                        <Input
                          value={review.name}
                          onChange={(e) => update({ name: e.target.value })}
                        />
                      </Field>
                      <Field label="Role / Location">
                        <Input
                          value={review.role}
                          onChange={(e) => update({ role: e.target.value })}
                        />
                      </Field>
                      <Field label="Rating (1-5)">
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={review.rating}
                          onChange={(e) =>
                            update({ rating: Number(e.target.value) })
                          }
                        />
                      </Field>
                      <Field label="Review" className="sm:col-span-2">
                        <Textarea
                          value={review.review}
                          onChange={(e) => update({ review: e.target.value })}
                          className="min-h-16 resize-none"
                        />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="choose-path">
            <Card>
              <p className="text-xs text-muted-foreground">
                The &quot;Hire Labour&quot; / &quot;Become a Labour&quot;
                section shown on the homepage, right below the hero.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.choosePath.heading}
                    onChange={(e) =>
                      updateChoosePathMeta({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.choosePath.subheading}
                    onChange={(e) =>
                      updateChoosePathMeta({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Hire Labour Card</SectionTitle>
              <div className="grid grid-cols-1 gap-3 rounded-lg border border-border p-4 sm:grid-cols-2">
                <Field label="Icon">
                  <IconPicker
                    value={content.choosePath.hireLabour.icon}
                    onChange={(icon) => updateHireLabourCard({ icon })}
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={content.choosePath.hireLabour.title}
                    onChange={(e) =>
                      updateHireLabourCard({ title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <Input
                    value={content.choosePath.hireLabour.description}
                    onChange={(e) =>
                      updateHireLabourCard({ description: e.target.value })
                    }
                  />
                </Field>
                <Field label="Button Label">
                  <Input
                    value={content.choosePath.hireLabour.buttonLabel}
                    onChange={(e) =>
                      updateHireLabourCard({ buttonLabel: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Become a Labour Card</SectionTitle>
              <div className="grid grid-cols-1 gap-3 rounded-lg border border-border p-4 sm:grid-cols-2">
                <Field label="Icon">
                  <IconPicker
                    value={content.choosePath.becomeLabour.icon}
                    onChange={(icon) => updateBecomeLabourCard({ icon })}
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={content.choosePath.becomeLabour.title}
                    onChange={(e) =>
                      updateBecomeLabourCard({ title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <Input
                    value={content.choosePath.becomeLabour.description}
                    onChange={(e) =>
                      updateBecomeLabourCard({ description: e.target.value })
                    }
                  />
                </Field>
                <Field label="Button Label">
                  <Input
                    value={content.choosePath.becomeLabour.buttonLabel}
                    onChange={(e) =>
                      updateBecomeLabourCard({ buttonLabel: e.target.value })
                    }
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mission-vision">
            <Card>
              <p className="text-xs text-muted-foreground">
                Shown as a section on the homepage, with a full write-up on the
                /mission-vision page.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.missionVision.heading}
                    onChange={(e) =>
                      updateMissionVisionMeta({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.missionVision.subheading}
                    onChange={(e) =>
                      updateMissionVisionMeta({ subheading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Mission Title">
                  <Input
                    value={content.missionVision.missionTitle}
                    onChange={(e) =>
                      updateMissionVisionMeta({ missionTitle: e.target.value })
                    }
                  />
                </Field>
                <Field label="Vision Title">
                  <Input
                    value={content.missionVision.visionTitle}
                    onChange={(e) =>
                      updateMissionVisionMeta({ visionTitle: e.target.value })
                    }
                  />
                </Field>
              </div>
              <Field label="Mission Text">
                <Textarea
                  value={content.missionVision.missionText}
                  onChange={(e) =>
                    updateMissionVisionMeta({ missionText: e.target.value })
                  }
                  className="min-h-16 resize-none"
                />
              </Field>
              <Field label="Vision Text">
                <Textarea
                  value={content.missionVision.visionText}
                  onChange={(e) =>
                    updateMissionVisionMeta({ visionText: e.target.value })
                  }
                  className="min-h-16 resize-none"
                />
              </Field>

              <SectionTitle>Core Values</SectionTitle>
              <ArrayEditor
                items={content.missionVision.values}
                onChange={(values) =>
                  setContent((c) => ({
                    ...c,
                    missionVision: { ...c.missionVision, values },
                  }))
                }
                newItem={() => ({
                  icon: "shield-check",
                  title: "New Value",
                  description: "Description",
                })}
                addLabel="Add value"
                minItems={0}
                renderItem={(value, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker
                        value={value.icon}
                        onChange={(icon) => update({ icon })}
                      />
                    </Field>
                    <Field label="Title">
                      <Input
                        value={value.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="Description">
                      <Input
                        value={value.description}
                        onChange={(e) =>
                          update({ description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="contact-bar">
            <Card>
              <p className="text-xs text-muted-foreground">
                This is the dark blue bar at the bottom of every page.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Help Title">
                  <Input
                    value={content.contact.helpTitle}
                    onChange={(e) =>
                      updateContact({ helpTitle: e.target.value })
                    }
                  />
                </Field>
                <Field label="Help Text">
                  <Input
                    value={content.contact.helpText}
                    onChange={(e) =>
                      updateContact({ helpText: e.target.value })
                    }
                  />
                </Field>
                <Field label="Phone Label">
                  <Input
                    value={content.contact.phoneLabel}
                    onChange={(e) =>
                      updateContact({ phoneLabel: e.target.value })
                    }
                  />
                </Field>
                <Field label="Phone Number">
                  <Input
                    value={content.contact.phone}
                    onChange={(e) => updateContact({ phone: e.target.value })}
                  />
                </Field>
                <Field label="Phone Note">
                  <Input
                    value={content.contact.phoneNote}
                    onChange={(e) =>
                      updateContact({ phoneNote: e.target.value })
                    }
                  />
                </Field>
                <Field label="WhatsApp Button Label">
                  <Input
                    value={content.contact.whatsappLabel}
                    onChange={(e) =>
                      updateContact({ whatsappLabel: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Social Media Links</SectionTitle>
              <p className="-mt-3 text-xs text-muted-foreground">
                Shown as icon links on the contact bar. Lucide has no
                Facebook/Instagram-style brand icons — for an authentic logo,
                upload one under the &quot;Icon Library&quot; tab first, then
                pick it here (marked &quot;custom&quot;). Leave the URL empty
                to hide a link.
              </p>
              <ArrayEditor
                items={content.contact.socialLinks}
                onChange={(socialLinks) => updateContact({ socialLinks })}
                newItem={() => ({
                  icon: "share-2",
                  label: "New Link",
                  url: "",
                })}
                addLabel="Add social link"
                minItems={0}
                renderItem={(link, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker
                        value={link.icon}
                        onChange={(icon) => update({ icon })}
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={link.label}
                        onChange={(e) => update({ label: e.target.value })}
                      />
                    </Field>
                    <Field label="URL">
                      <Input
                        value={link.url}
                        onChange={(e) => update({ url: e.target.value })}
                        placeholder="https://"
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="about-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /about page.
              </p>
              <Field label="About Image">
                <ImageUploadField
                  value={content.aboutPage.imagePublicId}
                  onChange={(imagePublicId) =>
                    updateAboutPage({ imagePublicId })
                  }
                  onUploadingChange={trackUploading}
                  hint="Shown beside the story text. Hidden if no image is set."
                  previewTransform="f_auto,q_auto,w_320,h_240,c_fill,g_auto"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.aboutPage.heading}
                    onChange={(e) =>
                      updateAboutPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.aboutPage.subheading}
                    onChange={(e) =>
                      updateAboutPage({ subheading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Story Heading">
                  <Input
                    value={content.aboutPage.storyHeading}
                    onChange={(e) =>
                      updateAboutPage({ storyHeading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Mission Heading">
                  <Input
                    value={content.aboutPage.missionHeading}
                    onChange={(e) =>
                      updateAboutPage({ missionHeading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <Field label="Mission Text">
                <Textarea
                  value={content.aboutPage.missionText}
                  onChange={(e) =>
                    updateAboutPage({ missionText: e.target.value })
                  }
                  className="min-h-16 resize-none"
                />
              </Field>

              <SectionTitle>Story Paragraphs</SectionTitle>
              <ArrayEditor
                items={content.aboutPage.storyParagraphs.map((text) => ({
                  text,
                }))}
                onChange={(items) =>
                  setContent((c) => ({
                    ...c,
                    aboutPage: {
                      ...c.aboutPage,
                      storyParagraphs: items.map((i) => i.text),
                    },
                  }))
                }
                newItem={() => ({ text: "New paragraph" })}
                addLabel="Add paragraph"
                minItems={1}
                renderItem={(item, update) => (
                  <Field label="Paragraph">
                    <Textarea
                      value={item.text}
                      onChange={(e) => update({ text: e.target.value })}
                      className="min-h-16 resize-none"
                    />
                  </Field>
                )}
              />

              <SectionTitle>Stats</SectionTitle>
              <ArrayEditor
                items={content.aboutPage.stats}
                onChange={(stats) =>
                  setContent((c) => ({
                    ...c,
                    aboutPage: { ...c.aboutPage, stats },
                  }))
                }
                newItem={() => ({
                  icon: "zap",
                  value: "0",
                  label: "New stat",
                  sublabel: "",
                })}
                addLabel="Add stat"
                minItems={1}
                renderItem={(stat, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <Field label="Icon">
                      <IconPicker
                        value={stat.icon}
                        onChange={(icon) => update({ icon })}
                      />
                    </Field>
                    <Field label="Value">
                      <Input
                        value={stat.value}
                        onChange={(e) => update({ value: e.target.value })}
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        value={stat.label}
                        onChange={(e) => update({ label: e.target.value })}
                      />
                    </Field>
                    <Field label="Sublabel">
                      <Input
                        value={stat.sublabel}
                        onChange={(e) => update({ sublabel: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Team</SectionTitle>
              <ArrayEditor
                items={content.aboutPage.team}
                onChange={(team) =>
                  setContent((c) => ({
                    ...c,
                    aboutPage: { ...c.aboutPage, team },
                  }))
                }
                newItem={() => ({
                  name: "New Person",
                  role: "Role",
                  bio: "Short bio",
                  imagePublicId: null,
                })}
                addLabel="Add team member"
                minItems={0}
                renderItem={(member, update) => (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ImageUploadField
                      value={member.imagePublicId}
                      onChange={(imagePublicId) => update({ imagePublicId })}
                      onUploadingChange={trackUploading}
                    />
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Name">
                        <Input
                          value={member.name}
                          onChange={(e) => update({ name: e.target.value })}
                        />
                      </Field>
                      <Field label="Role">
                        <Input
                          value={member.role}
                          onChange={(e) => update({ role: e.target.value })}
                        />
                      </Field>
                      <Field label="Bio" className="sm:col-span-2">
                        <Input
                          value={member.bio}
                          onChange={(e) => update({ bio: e.target.value })}
                        />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="contact-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /contact page.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.contactPage.heading}
                    onChange={(e) =>
                      updateContactPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.contactPage.subheading}
                    onChange={(e) =>
                      updateContactPage({ subheading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Form Heading">
                  <Input
                    value={content.contactPage.formHeading}
                    onChange={(e) =>
                      updateContactPage({ formHeading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Branches</SectionTitle>
              <p className="-mt-3 text-xs text-muted-foreground">
                Add one entry per office or branch location. Each is shown as its own card on
                the /contact page.
              </p>
              <ArrayEditor
                items={content.contactPage.branches}
                onChange={(branches) =>
                  setContent((c) => ({
                    ...c,
                    contactPage: { ...c.contactPage, branches },
                  }))
                }
                newItem={() => ({
                  name: "New Branch",
                  address: "",
                  phone: "",
                  email: "",
                  hours: "",
                })}
                addLabel="Add branch"
                minItems={1}
                renderItem={(branch, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Branch Name" className="sm:col-span-2">
                      <Input
                        value={branch.name}
                        onChange={(e) => update({ name: e.target.value })}
                      />
                    </Field>
                    <Field label="Address" className="sm:col-span-2">
                      <Input
                        value={branch.address}
                        onChange={(e) => update({ address: e.target.value })}
                      />
                    </Field>
                    <Field label="Phone">
                      <Input
                        value={branch.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                      />
                    </Field>
                    <Field label="Email">
                      <Input
                        value={branch.email}
                        onChange={(e) => update({ email: e.target.value })}
                      />
                    </Field>
                    <Field label="Hours" className="sm:col-span-2">
                      <Input
                        value={branch.hours}
                        onChange={(e) => update({ hours: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="services-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /services page. The service list itself is
                managed in the Services tab.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.servicesPage.heading}
                    onChange={(e) =>
                      updateServicesPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.servicesPage.subheading}
                    onChange={(e) =>
                      updateServicesPage({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>
              <Field label="Intro Text">
                <Textarea
                  value={content.servicesPage.intro}
                  onChange={(e) =>
                    updateServicesPage({ intro: e.target.value })
                  }
                  className="min-h-16 resize-none"
                />
              </Field>
            </Card>
          </TabsContent>

          <TabsContent value="find-labour-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /find-labour page. The worker list itself is
                managed in the Workers tab.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.findLabourPage.heading}
                    onChange={(e) =>
                      updateFindLabourPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.findLabourPage.subheading}
                    onChange={(e) =>
                      updateFindLabourPage({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="become-labour-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /become-labour page, where workers submit an
                application.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.becomeLabourPage.heading}
                    onChange={(e) =>
                      updateBecomeLabourPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.becomeLabourPage.subheading}
                    onChange={(e) =>
                      updateBecomeLabourPage({ subheading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Form Heading">
                  <Input
                    value={content.becomeLabourPage.formHeading}
                    onChange={(e) =>
                      updateBecomeLabourPage({ formHeading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Submit Button Label">
                  <Input
                    value={content.becomeLabourPage.submitLabel}
                    onChange={(e) =>
                      updateBecomeLabourPage({ submitLabel: e.target.value })
                    }
                  />
                </Field>
                <Field label="Success Message" className="sm:col-span-2">
                  <Input
                    value={content.becomeLabourPage.successMessage}
                    onChange={(e) =>
                      updateBecomeLabourPage({ successMessage: e.target.value })
                    }
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="how-it-works-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /how-it-works page. The navbar &quot;How It
                Works&quot; link points here.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.howItWorksPage.heading}
                    onChange={(e) =>
                      updateHowItWorksPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.howItWorksPage.subheading}
                    onChange={(e) =>
                      updateHowItWorksPage({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Videos</SectionTitle>
              <ArrayEditor
                items={content.howItWorksPage.videos}
                onChange={(videos) =>
                  setContent((c) => ({
                    ...c,
                    howItWorksPage: { ...c.howItWorksPage, videos },
                  }))
                }
                newItem={() => ({
                  title: "New Video",
                  description: "",
                  youtubeUrl: "",
                })}
                addLabel="Add video"
                minItems={0}
                renderItem={(video, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <Input
                        value={video.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="YouTube URL">
                      <Input
                        value={video.youtubeUrl}
                        onChange={(e) => update({ youtubeUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </Field>
                    <Field label="Description" className="sm:col-span-2">
                      <Input
                        value={video.description}
                        onChange={(e) =>
                          update({ description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="labour-request-page">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /labour-request page. The form fields, steps,
                and submit label are managed in the Steps tab.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.labourRequestPage.heading}
                    onChange={(e) =>
                      updateLabourRequestPage({ heading: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.labourRequestPage.subheading}
                    onChange={(e) =>
                      updateLabourRequestPage({ subheading: e.target.value })
                    }
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <div className="flex flex-col gap-6">
              <Card>
                <p className="text-xs text-muted-foreground">
                  Content for the /blog page header.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Heading">
                    <Input
                      value={content.blogPage.heading}
                      onChange={(e) =>
                        updateBlogPage({ heading: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Subheading">
                    <Input
                      value={content.blogPage.subheading}
                      onChange={(e) =>
                        updateBlogPage({ subheading: e.target.value })
                      }
                    />
                  </Field>
                </div>
              </Card>
              <BlogPanel />
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <RequestsPanel />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsPanel />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6 shadow-xs">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2 border-t border-border pt-5 text-sm font-semibold text-foreground">
      {children}
    </h3>
  );
}

function TagListEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-md border border-border py-1 pr-1 pl-2.5"
          >
            <input
              value={item}
              onChange={(e) =>
                onChange(
                  items.map((it, i) => (i === index ? e.target.value : it)),
                )
              }
              className="w-24 bg-transparent text-sm outline-none"
            />
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="text-destructive"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => onChange([...items, "New City"])}
      >
        Add city
      </Button>
    </div>
  );
}

function RequestsPanel() {
  const [requests, setRequests] = useState<LabourRequestDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/requests")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load requests");
        return res.json();
      })
      .then(setRequests)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Failed to load requests",
        ),
      );
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/requests/${id}`, { method: "DELETE" });
      setRequests((prev) => prev?.filter((r) => r.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card>
      <p className="text-xs text-muted-foreground">
        Labour requests submitted through the &quot;Request Labour&quot; form.
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && requests === null && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
      {requests?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No requests yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {requests?.map((req) => (
          <div
            key={req.id}
            className="flex items-start gap-3 rounded-lg border border-border p-4"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <ClipboardList className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {req.name}
                </p>
                <span className="text-xs text-muted-foreground">
                  {req.phone}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(req.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">Service:</strong>{" "}
                  {req.service}
                </span>
                <span>
                  <strong className="text-foreground">Location:</strong>{" "}
                  {req.location}
                </span>
                {req.date && (
                  <span>
                    <strong className="text-foreground">Date:</strong>{" "}
                    {req.date}
                  </span>
                )}
              </div>
              {req.details && (
                <p className="mt-1 text-sm text-foreground">{req.details}</p>
              )}
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="shrink-0 text-destructive"
              onClick={() => handleDelete(req.id)}
              disabled={deletingId === req.id}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ApplicationsPanel() {
  const [applications, setApplications] = useState<
    WorkerApplicationDTO[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/worker-applications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load applications");
        return res.json();
      })
      .then(setApplications)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Failed to load applications",
        ),
      );
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/worker-applications/${id}`, { method: "DELETE" });
      setApplications((prev) => prev?.filter((a) => a.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card>
      <p className="text-xs text-muted-foreground">
        Applications submitted through the &quot;Become a Labour&quot; form.
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && applications === null && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
      {applications?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No applications yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {applications?.map((app) => (
          <div
            key={app.id}
            className="flex items-start gap-3 rounded-lg border border-border p-4"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <HardHat className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {app.name}
                </p>
                <span className="text-xs text-muted-foreground">
                  {app.phone}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(app.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">Skill:</strong>{" "}
                  {app.service}
                </span>
                <span>
                  <strong className="text-foreground">Location:</strong>{" "}
                  {app.location}
                </span>
                {app.experience && (
                  <span>
                    <strong className="text-foreground">Experience:</strong>{" "}
                    {app.experience}
                  </span>
                )}
              </div>
              {app.details && (
                <p className="mt-1 text-sm text-foreground">{app.details}</p>
              )}
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="shrink-0 text-destructive"
              onClick={() => handleDelete(app.id)}
              disabled={deletingId === app.id}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState<ContactMessageDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load messages");
        return res.json();
      })
      .then(setMessages)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Failed to load messages",
        ),
      );
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev?.filter((m) => m.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card>
      <p className="text-xs text-muted-foreground">
        Messages submitted through the /contact page form.
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && messages === null && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
      {messages?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No messages yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className="flex items-start gap-3 rounded-lg border border-border p-4"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <Mail className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {msg.name}
                </p>
                <span className="text-xs text-muted-foreground">
                  {msg.contact}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground">{msg.message}</p>
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="shrink-0 text-destructive"
              onClick={() => handleDelete(msg.id)}
              disabled={deletingId === msg.id}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
