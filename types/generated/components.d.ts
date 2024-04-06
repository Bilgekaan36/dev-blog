import type { Schema, Attribute } from '@strapi/strapi';

export interface BlogPostsSelection extends Schema.Component {
  collectionName: 'components_blog_posts_selections';
  info: {
    displayName: 'postsSelection';
    icon: 'layer';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    featuredPosts: Attribute.Relation<
      'blog.posts-selection',
      'oneToMany',
      'api::post.post'
    >;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsMission extends Schema.Component {
  collectionName: 'components_components_missions';
  info: {
    displayName: 'mission';
    icon: 'collapse';
  };
  attributes: {
    heading: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our Mission'>;
    content: Attribute.Text & Attribute.Required;
    showLogo: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface ComponentsNewsLetterForm extends Schema.Component {
  collectionName: 'components_components_news_letter_forms';
  info: {
    displayName: 'newsLetterForm';
    icon: 'envelop';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    subHeading: Attribute.Text;
  };
}

export interface ComponentsSocialLink extends Schema.Component {
  collectionName: 'components_components_social_links';
  info: {
    displayName: 'socialLink';
    icon: 'exit';
  };
  attributes: {
    socialMedia: Attribute.Enumeration<
      ['github', 'youtube', 'twitter', 'facebook', 'whatsapp']
    > &
      Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface LayoutFeaturedCourse extends Schema.Component {
  collectionName: 'components_layout_featured_courses';
  info: {
    displayName: 'featuredCourse';
    icon: 'layout';
    description: '';
  };
  attributes: {
    course: Attribute.Relation<
      'layout.featured-course',
      'oneToOne',
      'api::course.course'
    >;
    heading: Attribute.String;
    announcement: Attribute.Text;
  };
}

export interface LayoutHero extends Schema.Component {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'hero';
    icon: 'store';
    description: '';
  };
  attributes: {
    callToAction: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    buttons: Attribute.Component<'components.link', true> & Attribute.Required;
  };
}

export interface LayoutPageInfo extends Schema.Component {
  collectionName: 'components_layout_page_infos';
  info: {
    displayName: 'PageInfo';
    icon: 'file';
  };
  attributes: {
    content: Attribute.Blocks;
    cover: Attribute.Media;
    seo: Attribute.Component<'seo.seo-information'>;
  };
}

export interface LayoutServicesPreview extends Schema.Component {
  collectionName: 'components_layout_services_previews';
  info: {
    displayName: 'servicesPreview';
    description: '';
  };
  attributes: {
    services: Attribute.Relation<
      'layout.services-preview',
      'oneToMany',
      'api::service.service'
    >;
  };
}

export interface SeoSeoInformation extends Schema.Component {
  collectionName: 'components_seo_seo_informations';
  info: {
    displayName: 'seoInformation';
    icon: 'search';
  };
  attributes: {
    seoTitle: Attribute.String;
    seoDescription: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blog.posts-selection': BlogPostsSelection;
      'components.link': ComponentsLink;
      'components.mission': ComponentsMission;
      'components.news-letter-form': ComponentsNewsLetterForm;
      'components.social-link': ComponentsSocialLink;
      'layout.featured-course': LayoutFeaturedCourse;
      'layout.hero': LayoutHero;
      'layout.page-info': LayoutPageInfo;
      'layout.services-preview': LayoutServicesPreview;
      'seo.seo-information': SeoSeoInformation;
    }
  }
}
