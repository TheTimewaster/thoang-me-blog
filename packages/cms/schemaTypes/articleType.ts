import {defineArrayMember, defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This is the title of the article',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'This is the URL path for the article',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'This is the date the article was published',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags for the article',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tag',
          fields: [
            {type: 'string', name: 'title'},
            {type: 'string', name: 'value'},
          ],
        }),
      ],
      options: {
        list: [
          {
            _type: 'tag',
            title: 'Dev',
            value: 'dev',
          },
          {
            _type: 'tag',
            title: 'CSS',
            value: 'css',
          },
          {
            _type: 'tag',
            title: 'JavaScript',
            value: 'javascript',
          },
          {
            _type: 'tag',
            title: 'Vue',
            value: 'vue',
          },
          {
            _type: 'tag',
            title: 'Travel',
            value: 'travel',
          },
          {
            _type: 'tag',
            title: 'Food',
            value: 'food',
          },
          {
            _type: 'tag',
            title: 'Photography',
            value: 'photography',
          },
          {
            _type: 'tag',
            title: 'Music',
            value: 'music',
          },
          {
            _type: 'tag',
            title: 'Games',
            value: 'games',
          },
          {
            _type: 'tag',
            title: 'Other',
            value: 'other',
          },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      description: 'This is the main image for the article',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          type: 'code',
        },
      ],
    }),
  ],
})
