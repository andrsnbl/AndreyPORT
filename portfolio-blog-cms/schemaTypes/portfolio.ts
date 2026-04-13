import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Design', value: 'webdesign'},
          {title: 'Mobile Design', value: 'mobiledesign'},
          {title: 'SEO', value: 'seo'},
          {title: 'Graphic Design', value: 'graphic'},
          {title: 'Photography', value: 'photography'},
          {title: 'Video', value: 'video'},
          {title: 'Branding', value: 'branding'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Design', value: 'design'},
          {title: 'Photography', value: 'photography'},
          {title: 'Video', value: 'video'},
          {title: 'App', value: 'app'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewType',
      title: 'Preview Type',
      type: 'string',
      options: {
        list: [
          {title: 'Website (iframe)', value: 'iframe'},
          {title: 'Image', value: 'image'},
          {title: 'Video (YouTube)', value: 'video'},
          {title: 'Gallery', value: 'gallery'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview URL / Content',
      type: 'string',
      description: 'URL untuk website iframe, YouTube video embed, atau image URL',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Untuk preview type "gallery"',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link (Optional)',
      type: 'url',
      description: 'Link ke website atau portofolio eksternal',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Tampilkan di bagian featured',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
        subtitle: selection.category,
      }
    },
  },
})
