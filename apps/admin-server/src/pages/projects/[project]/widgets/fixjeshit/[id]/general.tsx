import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/typography';
import { useFieldDebounce } from '@/hooks/useFieldDebounce';
import { EditFieldProps } from '@/lib/form-widget-helpers/EditFieldProps';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  // Inschrijven bij gemeente
  inschrijvenTitle: z.string().optional(),
  inschrijvenDescription: z.string().optional(),
  inschrijvenUrl: z
    .string()
    .url('Voer een geldige URL in')
    .or(z.literal(''))
    .optional(),
  inschrijvenButtonText: z.string().optional(),

  // Inschrijven sociale huurwoning
  huurwoningTitle: z.string().optional(),
  huurwoningDescription: z.string().optional(),
  huurwoningUrl: z
    .string()
    .url('Voer een geldige URL in')
    .or(z.literal(''))
    .optional(),
  huurwoningButtonText: z.string().optional(),

  // Hulp bij geldzaken
  geldzakenTitle: z.string().optional(),
  geldzakenDescription: z.string().optional(),
  geldzakenUrl: z
    .string()
    .url('Voer een geldige URL in')
    .or(z.literal(''))
    .optional(),
  geldzakenButtonText: z.string().optional(),

  // Studietoeslag
  studietoeslagTitle: z.string().optional(),
  studietoeslagDescription: z.string().optional(),
  studietoeslagUrl: z
    .string()
    .url('Voer een geldige URL in')
    .or(z.literal(''))
    .optional(),
  studietoeslagButtonText: z.string().optional(),

  // Informatie voor jongeren
  informatieTitle: z.string().optional(),
  informatieDescription: z.string().optional(),
  informatieUrl: z
    .string()
    .url('Voer een geldige URL in')
    .or(z.literal(''))
    .optional(),
  informatieButtonText: z.string().optional(),
});

type Formdata = z.infer<typeof formSchema>;

export default function FixJeShitGeneral(props: any & EditFieldProps<any>) {
  const { onFieldChange } = useFieldDebounce(props.onFieldChanged);

  function onSubmit(values: Formdata) {
    props.updateConfig({ ...props, ...values });
  }

  const form = useForm<Formdata>({
    resolver: zodResolver<any>(formSchema),
    defaultValues: {
      // Inschrijven bij gemeente
      inschrijvenTitle: props?.inschrijvenTitle || 'Inschrijven bij gemeente',
      inschrijvenDescription:
        props?.inschrijvenDescription ||
        'Dit moet binnen 5 dagen na verhuizing. Maak een afspraak bij je gemeente.',
      inschrijvenUrl: props?.inschrijvenUrl || '',
      inschrijvenButtonText: props?.inschrijvenButtonText || 'Fix dit nu',

      // Inschrijven sociale huurwoning
      huurwoningTitle:
        props?.huurwoningTitle || 'Inschrijven sociale huurwoning',
      huurwoningDescription:
        props?.huurwoningDescription ||
        'Schrijf je in voor een sociale huurwoning in je regio.',
      huurwoningUrl: props?.huurwoningUrl || '',
      huurwoningButtonText: props?.huurwoningButtonText || 'Fix dit nu',

      // Hulp bij geldzaken
      geldzakenTitle: props?.geldzakenTitle || 'Hulp bij geldzaken',
      geldzakenDescription:
        props?.geldzakenDescription ||
        'De gemeente kan helpen bij geldzorgen of schulden.',
      geldzakenUrl: props?.geldzakenUrl || '',
      geldzakenButtonText: props?.geldzakenButtonText || 'Bekijk hulp',

      // Studietoeslag
      studietoeslagTitle: props?.studietoeslagTitle || 'Studietoeslag',
      studietoeslagDescription:
        props?.studietoeslagDescription ||
        'Misschien heb je recht op studietoeslag via de gemeente.',
      studietoeslagUrl: props?.studietoeslagUrl || '',
      studietoeslagButtonText:
        props?.studietoeslagButtonText || 'Bekijk regeling',

      // Informatie voor jongeren
      informatieTitle: props?.informatieTitle || 'Informatie voor jongeren',
      informatieDescription:
        props?.informatieDescription ||
        'Informatie over wonen, werk en studie voor jongeren.',
      informatieUrl: props?.informatieUrl || '',
      informatieButtonText: props?.informatieButtonText || 'Meer informatie',
    },
  });

  return (
    <Form {...form} className="p-6 bg-white rounded-md">
      <Heading size="xl" className="mb-4">
        Fix Je Shit — Instellingen
      </Heading>
      <Separator className="mb-4" />

      <p className="text-sm text-muted-foreground mb-6">
        Hier kun je de links en teksten aanpassen die jongeren te zien krijgen
        in het resultaatscherm. Vul per onderdeel de juiste URL in voor jouw
        gemeente.
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:w-full grid grid-cols-1"
        style={{ gap: '1rem' }}>
        {/* ============ Inschrijven bij gemeente ============ */}
        <div className="p-4 border rounded-md space-y-4">
          <Heading size="lg">📍 Inschrijven bij gemeente</Heading>
          <p className="text-sm text-muted-foreground">
            Link naar de pagina waar jongeren zich kunnen inschrijven bij de
            gemeente na een verhuizing.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="inschrijvenTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inschrijvenButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knoptekst</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="inschrijvenDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschrijving</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inschrijvenUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.jouwgemeente.nl/verhuizing-doorgeven"
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ============ Inschrijven sociale huurwoning ============ */}
        <div className="p-4 border rounded-md space-y-4">
          <Heading size="lg">🏠 Inschrijven sociale huurwoning</Heading>
          <p className="text-sm text-muted-foreground">
            Link naar de regionale woningcorporatie of inschrijfpagina voor
            sociale huurwoningen.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="huurwoningTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="huurwoningButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knoptekst</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="huurwoningDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschrijving</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="huurwoningUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.entree.nu/Inschrijven"
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ============ Hulp bij geldzaken ============ */}
        <div className="p-4 border rounded-md space-y-4">
          <Heading size="lg">💰 Hulp bij geldzaken</Heading>
          <p className="text-sm text-muted-foreground">
            Link naar de gemeentelijke hulppagina voor jongeren met geldzorgen
            of schulden.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="geldzakenTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="geldzakenButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knoptekst</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="geldzakenDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschrijving</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="geldzakenUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.jouwgemeente.nl/hulp-bij-geldzorgen"
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ============ Studietoeslag ============ */}
        <div className="p-4 border rounded-md space-y-4">
          <Heading size="lg">🎓 Studietoeslag</Heading>
          <p className="text-sm text-muted-foreground">
            Link naar informatie over studietoeslag van de gemeente.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="studietoeslagTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studietoeslagButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knoptekst</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="studietoeslagDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschrijving</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studietoeslagUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.jouwgemeente.nl/studietoeslag"
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ============ Informatie voor jongeren ============ */}
        <div className="p-4 border rounded-md space-y-4">
          <Heading size="lg">ℹ️ Informatie voor jongeren</Heading>
          <p className="text-sm text-muted-foreground">
            Link naar een algemene informatiepagina voor jongeren in de
            gemeente.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="informatieTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="informatieButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knoptekst</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="informatieDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschrijving</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="informatieUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.jouwgemeente.nl/jongeren"
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange(field.name, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-fit col-span-full" type="submit">
          Opslaan
        </Button>
      </form>
    </Form>
  );
}
