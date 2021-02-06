exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  if (page.path.match(/^\/contact\/$/)) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        slug: process.env.FORMIUM_CONTACT_FORM_SLUG,
      },
    });
  }
};
