import {BoltIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const startup = defineType({
    name: 'startup',
    title: 'Startup',
    type: 'document',
    icon: BoltIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            }
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: [{ type: 'author' }]
        }),
        defineField({
            name: 'views',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(2).max(100).required().error('Category is required and should be between 2 and 100 characters'),
        }),
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required().error('Image URL is required'),
        }),
        defineField({
            name: 'pitch',
            type: 'markdown',
        }),
    ],
    
})