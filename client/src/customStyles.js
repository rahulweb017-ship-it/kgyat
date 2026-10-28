export const kgyatGlobalCustomStyles = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

      *:not(i):not(.fa):not(.fas):not(.far):not(.fab):not([class*="fa-"]) {
        font-family: 'IBM Plex Sans', sans-serif !important;
      }

      .fa, .fas, .far, i.fa, i.fas, i.far {
        font-family: "Font Awesome 5 Free" !important;
      }
      .fab, i.fab {
        font-family: "Font Awesome 5 Brands" !important;
      }

      body, p, span, div, a, li, h1, h2, h3, h4, h5, h6, input, textarea, button, select {
        line-height: 1.3 !important;
      }

      /* Paragraph Spacing Rule: 15px spacing below paragraph where new paragraph starts */
      .elementor-widget-text-editor p,
      .elementor-text-editor p,
      .entry-content p,
      #page p {
        margin-bottom: 15px !important;
      }
      .elementor-widget-text-editor p:last-child,
      .elementor-text-editor p:last-child {
        margin-bottom: 0px !important;
      }
      .elementor-widget-text-editor p br,
      .elementor-text-editor p br {
        content: "" !important;
        display: block !important;
        margin-bottom: 15px !important;
      }

      h1, .elementor-heading-title.elementor-size-default h1, h1.elementor-heading-title {
        font-size: 44px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        margin-bottom: 15px !important;
      }

      h2.elementor-heading-title,
      .elementor-heading-title.elementor-size-default h2,
      .kgyat-heading-h2 {
        font-size: 32px !important;
        color: #272727 !important;
        font-weight: 700 !important;
      }

      /* High-Specificity Headings on DARK Background Sections (White #ffffff) */
      /* IP & Recognition Hero Section Center Alignment (Scoped to page-id-5512) */
      body.page-id-5512 #page .elementor-element.elementor-element-6a150cd .elementor-heading-title,
      body.page-id-5512 #page .elementor-element.elementor-element-6a150cd .elementor-widget-container,
      body.page-id-5512 #page .elementor-element.elementor-element-6a150cd .elementor-widget-text-editor,
      body.page-id-5512 #page .elementor-element.elementor-element-6a150cd p,
      body.page-id-5512 #page .elementor-element.elementor-element-959cc44 .elementor-heading-title,
      body.page-id-5512 #page .elementor-element.elementor-element-959cc44 h1,
      body.page-id-5512 #page .elementor-element.elementor-element-959cc44 h2,
      body.page-id-5512 #page .elementor-element.elementor-element-959cc44 h3 {
        text-align: center !important;
      }
      body.page-id-5512 #page .elementor-element.elementor-element-35171c7 {
        align-items: center !important;
        margin: 0 auto !important;
      }

      /* Technology Page Hero Section: Left Align Text inside Container */
      body.page-id-5373 #page .elementor-element.elementor-element-6a150cd .elementor-heading-title,
      body.page-id-5373 #page .elementor-element.elementor-element-6a150cd .elementor-widget-container,
      body.page-id-5373 #page .elementor-element.elementor-element-6a150cd .elementor-widget-text-editor,
      body.page-id-5373 #page .elementor-element.elementor-element-6a150cd p,
      body.page-id-5373 #page .elementor-element.elementor-element-959cc44 .elementor-heading-title,
      body.page-id-5373 #page .elementor-element.elementor-element-959cc44 h1,
      body.page-id-5373 #page .elementor-element.elementor-element-959cc44 h2,
      body.page-id-5373 #page .elementor-element.elementor-element-959cc44 h3 {
        text-align: left !important;
      }
      body.page-id-5373 #page .elementor-element.elementor-element-35171c7 {
        align-items: flex-start !important;
        margin-left: 0 !important;
        margin-right: auto !important;
      }

      /* Comparative Analysis Page Hero Section: Center Align Heading */
      body.page-id-5472 #page .elementor-element.elementor-element-6a150cd .elementor-heading-title,
      body.page-id-5472 #page .elementor-element.elementor-element-6a150cd .elementor-widget-container,
      body.page-id-5472 #page .elementor-element.elementor-element-6a150cd h1,
      body.page-id-5472 #page .elementor-element.elementor-element-6a150cd h2,
      body.page-id-5472 #page .elementor-element.elementor-element-6a150cd h3,
      body.page-id-5472 #page .elementor-element.elementor-element-959cc44 .elementor-heading-title,
      body.page-id-5472 #page .elementor-element.elementor-element-959cc44 h1,
      body.page-id-5472 #page .elementor-element.elementor-element-959cc44 h2,
      body.page-id-5472 #page .elementor-element.elementor-element-959cc44 h3 {
        text-align: center !important;
      }
      body.page-id-5472 #page .elementor-element.elementor-element-35171c7 {
        align-items: center !important;
        margin: 0 auto !important;
      }

      /* What We Do Page - Hero Section R & D Text Label */
      body.page-id-2578 #page .elementor-element.elementor-element-3e55516 .elementor-heading-title,
      body.page-id-2578 .elementor-element-3e55516 .elementor-heading-title {
        color: #CF3367 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        margin-bottom: 10px !important;
      }

      /* What We Do Page - Services Section (We cover all aspects...) */
      body.page-id-2578 .elementor-element.elementor-element-2d66078 {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        padding: 60px 20px !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-32f1514,
      body.page-id-2578 .elementor-element.elementor-element-32f1514 .elementor-widget-container,
      body.page-id-2578 .elementor-element.elementor-element-32f1514 .elementor-heading-title,
      body.page-id-2578 .elementor-element.elementor-element-64ca5d5,
      body.page-id-2578 .elementor-element.elementor-element-64ca5d5 .elementor-widget-container,
      body.page-id-2578 .elementor-element.elementor-element-64ca5d5 .elementor-heading-title {
        background: none !important;
        background-color: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-2d66078 .e-con-inner {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 24px !important;
        max-width: 1200px !important;
        margin: 0 auto !important;
      }
      /* Full-Width Section Header */
      body.page-id-2578 .elementor-element.elementor-element-32f1514 {
        width: 100% !important;
        max-width: 100% !important;
        flex: 0 0 100% !important;
        text-align: center !important;
        margin-bottom: 25px !important;
        align-items: center !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-32f1514 .elementor-heading-title {
        font-size: 32px !important;
        font-weight: 700 !important;
        color: #272727 !important;
        line-height: 1.35 !important;
        max-width: 850px !important;
        margin: 0 auto !important;
        text-align: center !important;
      }
      /* 5 Modern Elevated Service Cards */
      body.page-id-2578 .elementor-element.elementor-element-2d66078 > .e-con-inner > .e-child:not(.elementor-element-32f1514) {
        flex: 0 0 calc(33.333% - 16px) !important;
        width: calc(33.333% - 16px) !important;
        max-width: calc(33.333% - 16px) !important;
        background: #ffffff !important;
        border: 1px solid #eef2f6 !important;
        border-radius: 16px !important;
        padding: 36px 24px !important;
        box-shadow: 0 6px 20px rgba(0, 52, 107, 0.05) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;
        text-align: center !important;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        box-sizing: border-box !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-2d66078 > .e-con-inner > .e-child:not(.elementor-element-32f1514):hover {
        transform: translateY(-8px) !important;
        box-shadow: 0 16px 36px rgba(0, 52, 107, 0.12) !important;
        border-color: #CF3367 !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-2d66078 .elementor-image-box-img {
        margin-bottom: 22px !important;
        height: 80px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-2d66078 .elementor-image-box-img img {
        max-height: 80px !important;
        width: auto !important;
        object-fit: contain !important;
        transition: transform 0.3s ease !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-2d66078 > .e-con-inner > .e-child:hover .elementor-image-box-img img {
        transform: scale(1.08) !important;
      }
      body.page-id-2578 .elementor-element.elementor-element-2d66078 .elementor-image-box-title {
        font-size: 17px !important;
        font-weight: 600 !important;
        color: #00346B !important;
        line-height: 1.45 !important;
        margin: 0 !important;
      }
      @media (max-width: 991px) and (min-width: 600px) {
        body.page-id-2578 .elementor-element.elementor-element-2d66078 > .e-con-inner > .e-child:not(.elementor-element-32f1514) {
          flex: 0 0 calc(50% - 12px) !important;
          width: calc(50% - 12px) !important;
          max-width: calc(50% - 12px) !important;
        }
      }
      @media (max-width: 599px) {
        body.page-id-2578 .elementor-element.elementor-element-2d66078 > .e-con-inner > .e-child:not(.elementor-element-32f1514) {
          flex: 0 0 100% !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 24px 18px !important;
        }
      }

      /* Why Fuel-Agnostic Engines Matter Now - Hero Fuel Pills (18px, 600 weight) */
      body.page-id-5694 .elementor-element.elementor-element-4ea1990 {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 12px !important;
        margin-top: 25px !important;
      }
      body.page-id-5694 .elementor-element.elementor-element-4ea1990 .elementor-widget-heading {
        width: auto !important;
        margin: 0 !important;
      }
      body.page-id-5694 .elementor-element.elementor-element-4ea1990 .elementor-widget-heading > .elementor-widget-container {
        padding: 8px 18px !important;
        border-radius: 50px !important;
        background-color: rgba(0, 0, 0, 0.65) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      body.page-id-5694 .elementor-element.elementor-element-4ea1990 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-8b311f7 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-d2ea81e .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-2aed353 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-08c6042 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-36dae38 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-baa77d8 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-96199f2 .elementor-heading-title,
      body.page-id-5694 .elementor-element.elementor-element-4ea1990 h2 {
        font-size: 18px !important;
        font-weight: 600 !important;
        color: #ffffff !important;
        margin: 0 !important;
        line-height: 1.2 !important;
        letter-spacing: 0.5px !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
      }

      body #page .elementor-element.elementor-element-959cc44 .elementor-heading-title,
      body #page .elementor-element.elementor-element-959cc44 h1,
      body #page .elementor-element.elementor-element-959cc44 h2,
      body #page .elementor-element.elementor-element-959cc44 h3,
      body #page .elementor-element.elementor-element-6a150cd .elementor-heading-title,
      body #page .elementor-element.elementor-element-6a150cd h1,
      body #page .elementor-element.elementor-element-6a150cd h2,
      body #page .elementor-element.elementor-element-6a150cd h3,
      /* Main Heading (Rethinking Combustion...): Kept like before (32px, bold 700, white #ffffff) */
      body #page .elementor-element.elementor-element-aa6e0bc .elementor-heading-title,
      body #page .elementor-element.elementor-element-aa6e0bc h1,
      body #page .elementor-element.elementor-element-aa6e0bc h2,
      body #page .elementor-element.elementor-element-aa6e0bc h3 {
        color: #ffffff !important;
        font-size: 32px !important;
        font-weight: 700 !important;
        margin-bottom: 15px !important;
      }
      /* Subheading Specific Override: Normal font-weight (400), 20px font-size, white color */
      body #page .elementor-element.elementor-element-d97856e .elementor-heading-title,
      body #page .elementor-element.elementor-element-d97856e h1,
      body #page .elementor-element.elementor-element-d97856e h2,
      body #page .elementor-element.elementor-element-d97856e h3 {
        color: #ffffff !important;
        font-size: 20px !important;
        font-weight: 400 !important;
        line-height: 1.4 !important;
        margin-bottom: 20px !important;
      }
      body #page .elementor-element.elementor-element-837f37e .elementor-heading-title,
      body #page .elementor-element.elementor-element-837f37e h1,
      body #page .elementor-element.elementor-element-837f37e h2,
      body #page .elementor-element.elementor-element-837f37e h3,
      body #page .elementor-element.elementor-element-54dda64 .elementor-heading-title,
      body #page .elementor-element.elementor-element-54dda64 h1,
      body #page .elementor-element.elementor-element-54dda64 h2,
      body #page .elementor-element.elementor-element-54dda64 h3,
      body #page .elementor-element.elementor-element-2bd9c57 .elementor-heading-title,
      body #page .elementor-element.elementor-element-2bd9c57 h1,
      body #page .elementor-element.elementor-element-2bd9c57 h2,
      body #page .elementor-element.elementor-element-2bd9c57 h3,
      body #page .elementor-element.elementor-element-8f7ed1e .elementor-heading-title,
      body #page .elementor-element.elementor-element-8f7ed1e h1,
      body #page .elementor-element.elementor-element-8f7ed1e h2,
      body #page .elementor-element.elementor-element-8f7ed1e h3,
      body #page .elementor-element.elementor-element-13903d5 .elementor-heading-title,
      body #page .elementor-element.elementor-element-13903d5 h1,
      body #page .elementor-element.elementor-element-13903d5 h2,
      body #page .elementor-element.elementor-element-13903d5 h3,
      body #page .elementor-element.elementor-element-1ab1f77 .elementor-heading-title,
      body #page .elementor-element.elementor-element-1ab1f77 h1,
      body #page .elementor-element.elementor-element-1ab1f77 h2,
      body #page .elementor-element.elementor-element-1ab1f77 h3,
      body #page .elementor-element.elementor-element-f901494 .elementor-heading-title,
      body #page .elementor-element.elementor-element-f901494 h1,
      body #page .elementor-element.elementor-element-f901494 h2,
      body #page .elementor-element.elementor-element-f901494 h3,
      body #page .elementor-element.elementor-element-76918e2 .elementor-heading-title,
      body #page .elementor-element.elementor-element-76918e2 h1,
      body #page .elementor-element.elementor-element-76918e2 h2,
      body #page .elementor-element.elementor-element-76918e2 h3,
      body #page .elementor-element.elementor-element-ecd1c65 .elementor-heading-title,
      body #page .elementor-element.elementor-element-ecd1c65 h1,
      body #page .elementor-element.elementor-element-ecd1c65 h2,
      body #page .elementor-element.elementor-element-ecd1c65 h3,
      body #page .elementor-element.elementor-element-c42bd73 .elementor-heading-title,
      body #page .elementor-element.elementor-element-c42bd73 h1,
      body #page .elementor-element.elementor-element-c42bd73 h2,
      body #page .elementor-element.elementor-element-c42bd73 h3,
      body #page .elementor-element.elementor-element-0b0c7b8 .elementor-heading-title,
      body #page .elementor-element.elementor-element-0b0c7b8 h1,
      body #page .elementor-element.elementor-element-0b0c7b8 h2,
      body #page .elementor-element.elementor-element-0b0c7b8 h3,
      body #page .elementor-element.elementor-element-b9d0a09 .elementor-heading-title,
      body #page .elementor-element.elementor-element-b9d0a09 h1,
      body #page .elementor-element.elementor-element-b9d0a09 h2,
      body #page .elementor-element.elementor-element-b9d0a09 h3,
      /* Organisation Structure Hero Section (White #ffffff) */
      body.page-id-3742 #page .elementor-element.elementor-element-63c8367 .elementor-heading-title,
      body.page-id-3742 #page .elementor-element.elementor-element-63c8367 h1,
      body.page-id-3742 #page .elementor-element.elementor-element-63c8367 h2,
      body.page-id-3742 #page .elementor-element.elementor-element-63c8367 h3,
      body.page-id-3742 #page .elementor-element.elementor-element-082fb00 .elementor-heading-title,
      body.page-id-3742 #page .elementor-element.elementor-element-082fb00 h1,
      body.page-id-3742 #page .elementor-element.elementor-element-082fb00 h2,
      body.page-id-3742 #page .elementor-element.elementor-element-082fb00 h3,
      /* What We Do: Core R&D Capabilities Heading (White #ffffff) */
      body.page-id-2578 #page .elementor-element.elementor-element-7a71ed8 .elementor-heading-title,
      body.page-id-2578 #page .elementor-element.elementor-element-7a71ed8 h1,
      body.page-id-2578 #page .elementor-element.elementor-element-7a71ed8 h2,
      body.page-id-2578 #page .elementor-element.elementor-element-7a71ed8 h3,
      body.page-id-2578 #page .elementor-element.elementor-element-285d651 .elementor-heading-title,
      body.page-id-2578 #page .elementor-element.elementor-element-285d651 h1,
      body.page-id-2578 #page .elementor-element.elementor-element-285d651 h2,
      body.page-id-2578 #page .elementor-element.elementor-element-285d651 h3,
      /* Why Fuel-Agnostic Engines Matter Now: Deeper Question Banner (White #ffffff) */
      body.page-id-5694 #page .elementor-element.elementor-element-aa0c410 .elementor-heading-title,
      body.page-id-5694 #page .elementor-element.elementor-element-aa0c410 h1,
      body.page-id-5694 #page .elementor-element.elementor-element-aa0c410 h2,
      body.page-id-5694 #page .elementor-element.elementor-element-aa0c410 h3,
      body #page .elementor-element.elementor-element-aa0c410 .elementor-heading-title,
      body #page .elementor-element.elementor-element-aa0c410 h1,
      body #page .elementor-element.elementor-element-aa0c410 h2,
      body #page .elementor-element.elementor-element-aa0c410 h3,
      body #page .elementor-element.elementor-element-e38546e .elementor-heading-title,
      body #page .elementor-element.elementor-element-e38546e h1,
      body #page .elementor-element.elementor-element-e38546e h2,
      body #page .elementor-element.elementor-element-e38546e h3 {
        color: #ffffff !important;
      }

      /* Headings on LIGHT Background Sections (Dark #272727) */
      body #page .elementor-element.elementor-element-2bf34ee .elementor-heading-title,
      body #page .elementor-element.elementor-element-2bf34ee h1,
      body #page .elementor-element.elementor-element-2bf34ee h2,
      body #page .elementor-element.elementor-element-2bf34ee h3,
      body #page .elementor-element.elementor-element-e190628 .elementor-heading-title,
      body #page .elementor-element.elementor-element-e190628 h1,
      body #page .elementor-element.elementor-element-e190628 h2,
      body #page .elementor-element.elementor-element-e190628 h3,
      body #page .elementor-element.elementor-element-de88c67 .elementor-heading-title,
      body #page .elementor-element.elementor-element-de88c67 h1,
      body #page .elementor-element.elementor-element-de88c67 h2,
      body #page .elementor-element.elementor-element-de88c67 h3,
      body #page .elementor-element.elementor-element-ba98338 .elementor-heading-title,
      body #page .elementor-element.elementor-element-ba98338 h1,
      body #page .elementor-element.elementor-element-ba98338 h2,
      body #page .elementor-element.elementor-element-ba98338 h3,
      body #page .elementor-element.elementor-element-8d093fa .elementor-heading-title,
      body #page .elementor-element.elementor-element-8d093fa h1,
      body #page .elementor-element.elementor-element-8d093fa h2,
      body #page .elementor-element.elementor-element-8d093fa h3,
      body #page .elementor-element.elementor-element-e15e368 .elementor-heading-title,
      body #page .elementor-element.elementor-element-e15e368 h1,
      body #page .elementor-element.elementor-element-e15e368 h2,
      body #page .elementor-element.elementor-element-e15e368 h3,
      body #page .elementor-element.elementor-element-182caec .elementor-heading-title,
      body #page .elementor-element.elementor-element-182caec h1,
      body #page .elementor-element.elementor-element-182caec h2,
      body #page .elementor-element.elementor-element-182caec h3,
      body #page .elementor-element.elementor-element-15f1f5b .elementor-heading-title,
      body #page .elementor-element.elementor-element-15f1f5b h1,
      body #page .elementor-element.elementor-element-15f1f5b h2,
      body #page .elementor-element.elementor-element-15f1f5b h3,
      body #page .elementor-element.elementor-element-42aaa71 .elementor-heading-title,
      body #page .elementor-element.elementor-element-42aaa71 h1,
      body #page .elementor-element.elementor-element-42aaa71 h2,
      body #page .elementor-element.elementor-element-42aaa71 h3,
      body #page .elementor-element.elementor-element-12e1f18 .elementor-heading-title,
      body #page .elementor-element.elementor-element-12e1f18 h1,
      body #page .elementor-element.elementor-element-12e1f18 h2,
      body #page .elementor-element.elementor-element-12e1f18 h3,
      body #page .elementor-element.elementor-element-e2b3f5a .elementor-heading-title,
      body #page .elementor-element.elementor-element-e2b3f5a h1,
      body #page .elementor-element.elementor-element-e2b3f5a h2,
      body #page .elementor-element.elementor-element-e2b3f5a h3,
      .elementor-element-e2b3f5a .elementor-heading-title,
      .elementor-element-e2b3f5a h1,
      .elementor-element-e2b3f5a h2,
      .elementor-element-e2b3f5a h3 {
        color: #272727 !important;
      }

      /* Spacing below Detailed Comparetative Analysis Heading */
      .elementor-element-8d093fa,
      .elementor-element-8d093fa > .elementor-widget-container,
      .elementor-element-8d093fa h2,
      .elementor-element-8d093fa .elementor-heading-title {
        margin-bottom: 16px !important;
      }

      /* Interactive Accordion & Toggle Widget Styling */
      .elementor-toggle-item,
      .elementor-accordion-item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
        margin-bottom: 10px !important;
        padding-bottom: 6px !important;
      }
      .elementor-tab-title {
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 8px 0 !important;
        transition: color 0.2s ease !important;
        user-select: none !important;
      }
      .elementor-tab-title .elementor-toggle-title,
      .elementor-tab-title a.elementor-toggle-title {
        font-size: 16px !important;
        font-weight: 600 !important;
        color: #CF3367 !important;
        text-decoration: none !important;
      }
      .elementor-tab-title.elementor-active .elementor-toggle-title,
      .elementor-tab-title:hover .elementor-toggle-title {
        color: #A82450 !important;
      }
      .elementor-tab-title .elementor-toggle-icon {
        color: #CF3367 !important;
        font-size: 14px !important;
      }
      .elementor-tab-title.elementor-active .elementor-toggle-icon-closed {
        display: none !important;
      }
      .elementor-tab-title.elementor-active .elementor-toggle-icon-opened {
        display: inline-block !important;
      }
      .elementor-tab-title:not(.elementor-active) .elementor-toggle-icon-closed {
        display: inline-block !important;
      }
      .elementor-tab-title:not(.elementor-active) .elementor-toggle-icon-opened {
        display: none !important;
      }
      .elementor-tab-content {
        padding: 8px 0 12px 24px !important;
        font-size: 15px !important;
        line-height: 1.6 !important;
        color: #444444 !important;
      }
      .elementor-tab-content p {
        margin: 0 !important;
        color: #444444 !important;
        font-size: 15px !important;
      }

      /* Combustion & Emissions Page Image Fixes */
      .elementor-element-311c8d8 img,
      .elementor-element-fd968c4 img,
      .elementor-element-cabfe44 img,
      .elementor-element-873ce83 img {
        border-radius: 14px !important;
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
      }

      /* Header Standalone Contact Button & Ecosystem Dropdown Styles */
      .kgyat-header-contact-btn {
        background-color: #CF3367 !important;
        color: #ffffff !important;
        padding: 8px 20px !important;
        border-radius: 4px !important;
        font-weight: 600 !important;
        margin-left: 12px !important;
        transition: all 0.25s ease-in-out !important;
        text-decoration: none !important;
        display: inline-block !important;
        line-height: 1.2 !important;
      }
      .kgyat-header-contact-btn:hover {
        background-color: #A82450 !important;
        color: #ffffff !important;
        box-shadow: 0 4px 14px rgba(207, 51, 103, 0.35) !important;
        transform: translateY(-1px) !important;
      }
      ul.hfe-nav-menu > li.kgyat-header-contact-item {
        margin-left: 10px !important;
        display: flex !important;
        align-items: center !important;
      }
      ul.hfe-nav-menu > li.kgyat-header-contact-item > a:before,
      ul.hfe-nav-menu > li.kgyat-header-contact-item > a:after {
        display: none !important;
      }
      .hfe-nav-menu .sub-menu {
        border-radius: 6px !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        padding: 8px 0 !important;
        background-color: #ffffff !important;
      }
      .hfe-nav-menu .sub-menu a.hfe-sub-menu-item {
        padding: 8px 16px !important;
        color: #272727 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-size: 14px !important;
        font-weight: 500 !important;
      }
      .hfe-nav-menu .sub-menu a.hfe-sub-menu-item:hover {
        background-color: #f7f7f9 !important;
        color: #CF3367 !important;
      }

      /* Homepage - Align WHAT WE DO / From Core Physics to Future Machines to Left */
      .elementor-element-eb18b0e,
      .elementor-element-eb18b0e .elementor-widget-container,
      .elementor-element-eb18b0e .kgyat-title-wrapper,
      .elementor-element-eb18b0e .kgyat-top-label,
      .elementor-element-eb18b0e .kgyat-heading-h2,
      .elementor-element-eb18b0e .elementor-heading-title {
        text-align: left !important;
      }

      /* Header Navbar Item - Engineering Arm of GYATK Color #CF3367 */
      .elementor-element-4f3358f,
      .elementor-element-4f3358f p,
      .elementor-element-4f3358f .elementor-heading-title,
      .elementor-element-4f3358f .elementor-widget-container {
        color: #CF3367 !important;
        text-transform: none !important;
      }

      /* Keep engine subdirectory navbar brand text on a single line and normal font style (not italic) */
      body.page-id-3773 #engine-menu .elementor-heading-title,
      body.page-id-3773 .engine-subdirectory-header .elementor-heading-title,
      .engine-subdirectory-header .elementor-heading-title,
      #engine-menu .elementor-heading-title,
      .elementor-element-c689975 .elementor-heading-title,
      #engine-menu .elementor-element-4f3358f,
      #engine-menu .elementor-element-4f3358f p,
      #engine-menu .elementor-element-4f3358f *,
      #engine-menu .elementor-element-4f3358f .elementor-widget-container,
      .elementor-element-4f3358f,
      .elementor-element-4f3358f p,
      .elementor-element-4f3358f *,
      .elementor-element-4f3358f .elementor-widget-container,
      .elementor-element-4f3358f .elementor-heading-title {
        white-space: nowrap !important;
        word-break: keep-all !important;
        max-width: none !important;
        font-style: normal !important;
      }

      /* The Structural Limits of Conventional Engines - Fix headline wrapping and prevent overlapping */
      body #page .elementor-element.elementor-element-de88c67,
      body #page .elementor-element.elementor-element-de88c67 .elementor-widget-container,
      body #page .elementor-element.elementor-element-de88c67 .elementor-heading-title,
      body #page .elementor-element.elementor-element-de88c67 h2 {
        white-space: normal !important;
        word-break: normal !important;
        overflow-wrap: break-word !important;
        line-height: 1.25 !important;
      }

      #engine-menu .elementor-element-5319762 {
        flex-wrap: nowrap !important;
        max-width: none !important;
      }

      /* Engine Subdirectory Hero Typography */
      body.page-id-3773 #page .elementor-element.elementor-element-engine-top-label .kgyat-top-label,
      .elementor-element-engine-top-label .kgyat-top-label {
        color: #CF3367 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        margin-bottom: 14px !important;
        line-height: 1.2 !important;
        display: block !important;
      }
      body.page-id-3773 #page .elementor-element.elementor-element-8f7ed1e .elementor-heading-title,
      body.page-id-3773 #page .elementor-element.elementor-element-8f7ed1e h1,
      body.page-id-3773 #page .elementor-element.elementor-element-8f7ed1e h2 {
        font-size: 42px !important;
        font-weight: 700 !important;
        line-height: 1.2 !important;
        color: #ffffff !important;
        margin-bottom: 12px !important;
        letter-spacing: -0.5px !important;
      }
      body.page-id-3773 #page .elementor-element.elementor-element-engine-supporting-line .elementor-heading-title,
      body.page-id-3773 #page .elementor-element.elementor-element-engine-supporting-line h2,
      body.page-id-3773 #page .elementor-element.elementor-element-engine-supporting-line h3 {
        font-size: 19px !important;
        font-weight: 600 !important;
        line-height: 1.4 !important;
        color: #ffffff !important;
        margin-bottom: 18px !important;
        letter-spacing: 0.2px !important;
      }
      body.page-id-3773 #page .elementor-element.elementor-element-ecd1c65 .elementor-heading-title,
      body.page-id-3773 #page .elementor-element.elementor-element-ecd1c65 h2,
      body.page-id-3773 #page .elementor-element.elementor-element-ecd1c65 h3 {
        font-size: 22px !important;
        font-weight: 600 !important;
        line-height: 1.35 !important;
        color: #ffffff !important;
        margin-bottom: 8px !important;
        letter-spacing: 0px !important;
      }
      body.page-id-3773 #page .elementor-element.elementor-element-5b4c3ec p,
      body.page-id-3773 #page .elementor-element.elementor-element-5b4c3ec {
        font-size: 15px !important;
        line-height: 1.6 !important;
        color: #e4e4e4 !important;
        margin-bottom: 22px !important;
      }

      /* Engine Subdirectory - Why KGYAT Engines Section */
      .elementor-element-why-kgyat-engines {
        background-color: #ffffff !important;
        padding: 70px 0 60px 0 !important;
      }
      .elementor-element-why-kgyat-engines .e-con-inner {
        max-width: 1000px !important;
        margin: 0 auto !important;
        padding: 0 24px !important;
      }
      .elementor-element-why-kgyat-engines .kgyat-top-label {
        color: #CF3367 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        margin-bottom: 12px !important;
        display: block !important;
      }
      .elementor-element-why-kgyat-engines .elementor-heading-title,
      .elementor-element-why-kgyat-engines h2 {
        color: #272727 !important;
        font-size: 36px !important;
        font-weight: 700 !important;
        line-height: 1.25 !important;
        margin-top: 0 !important;
        margin-bottom: 22px !important;
        white-space: normal !important;
        word-break: normal !important;
      }
      .elementor-element-why-kgyat-engines p {
        font-size: 16.5px !important;
        line-height: 1.75 !important;
        color: #374151 !important;
        margin-bottom: 18px !important;
        font-weight: 400 !important;
        font-style: normal !important;
      }
      .elementor-element-why-kgyat-engines p:last-child {
        margin-bottom: 0 !important;
      }
      @media (max-width: 768px) {
        .elementor-element-why-kgyat-engines {
          padding: 45px 0 40px 0 !important;
        }
        .elementor-element-why-kgyat-engines .elementor-heading-title,
        .elementor-element-why-kgyat-engines h2 {
          font-size: 28px !important;
          margin-bottom: 16px !important;
        }
        .elementor-element-why-kgyat-engines p {
          font-size: 15.5px !important;
          line-height: 1.65 !important;
        }
      }


      /* Homepage Hero Section Label - ENABLING TRANSFORMATIVE KINETICS Color #CF3367 & Uppercase */
      .elementor-element-8ae3dc3 .kgyat-top-label {
        color: #CF3367 !important;
        text-transform: uppercase !important;
      }

      /* Homepage OUR PURPOSE & SERVICES Eyebrow Labels Color #CF3367 */
      .elementor-element-d6e07c4 .kgyat-top-label,
      .elementor-element-cc7d513 .kgyat-top-label {
        color: #CF3367 !important;
      }

      /* About Page - All Top Labels (Eyebrow Labels) Color #CF3367 */
      body.page-id-2434 .kgyat-top-label,
      .page-id-2434 .kgyat-top-label,
      .elementor-page-2434 .kgyat-top-label,
      #page .kgyat-top-label,
      .elementor-element-4bd9455 .kgyat-top-label,
      .elementor-element-a6c92bb .kgyat-top-label,
      .elementor-element-1a9a8ba .kgyat-top-label,
      .elementor-element-dd4b11c .kgyat-top-label,
      .elementor-element-1a6336f .kgyat-top-label,
      .elementor-element-9a87f2d .kgyat-top-label,
      .elementor-element-62acdb3 .kgyat-top-label,
      .elementor-element-c1336f7 .kgyat-top-label,
      .elementor-element-c23d8e5 .kgyat-top-label,
      .elementor-element-e0a29fe .kgyat-top-label,
      .elementor-element-62ccfed .kgyat-top-label,
      .elementor-element-4aade68 .kgyat-top-label,
      .elementor-element-9294888 .kgyat-top-label {
        color: #CF3367 !important;
      }

      
      /* About Page Hero Section - Custom Interactive Tooltips for GYATK & RVCR */
      .kgyat-tooltip-wrap {
        position: relative;
        display: inline-block;
        cursor: pointer;
      }

      .kgyat-tooltip-wrap .kgyat-tooltip-trigger {
        color: #CF3367 !important;
        font-weight: 600 !important;
        text-decoration: underline dotted #CF3367 1.5px !important;
        text-underline-offset: 4px !important;
        transition: color 0.2s ease, text-decoration-color 0.2s ease !important;
        position: relative;
        display: inline;
      }

      .kgyat-tooltip-wrap:hover .kgyat-tooltip-trigger,
      .kgyat-tooltip-wrap:focus-within .kgyat-tooltip-trigger {
        color: #ff548e !important;
        text-decoration-color: #ff548e !important;
      }

      .kgyat-tooltip-wrap .kgyat-tooltip-box {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%) translateY(4px);
        background: #0d1b2a;
        background: linear-gradient(135deg, #111e33 0%, #0b1524 100%);
        color: #ffffff !important;
        border: 1px solid rgba(207, 51, 103, 0.45);
        box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.6), 0 0 16px rgba(207, 51, 103, 0.25);
        border-radius: 8px;
        padding: 9px 14px;
        font-size: 13px !important;
        font-weight: 400 !important;
        line-height: 1.45 !important;
        width: max-content;
        max-width: 270px;
        text-align: center;
        z-index: 9999;
        pointer-events: none;
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s;
      }

      /* Tooltip Downward Arrow Border */
      .kgyat-tooltip-wrap .kgyat-tooltip-box::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -7px;
        border-width: 7px;
        border-style: solid;
        border-color: rgba(207, 51, 103, 0.45) transparent transparent transparent;
      }

      /* Tooltip Downward Arrow Background */
      .kgyat-tooltip-wrap .kgyat-tooltip-box::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -6px;
        border-width: 6px;
        border-style: solid;
        border-color: #0b1524 transparent transparent transparent;
      }

      /* Hover & Focus state */
      .kgyat-tooltip-wrap:hover .kgyat-tooltip-box,
      .kgyat-tooltip-wrap:focus-within .kgyat-tooltip-box,
      .kgyat-tooltip-wrap.active .kgyat-tooltip-box {
        visibility: visible;
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      /* Responsive Tooltip Alignment on Mobile Screens */
      @media (max-width: 600px) {
        .kgyat-tooltip-wrap .kgyat-tooltip-box {
          max-width: 250px;
          left: -10px;
          transform: translateY(4px);
        }
        .kgyat-tooltip-wrap:hover .kgyat-tooltip-box,
        .kgyat-tooltip-wrap:focus-within .kgyat-tooltip-box,
        .kgyat-tooltip-wrap.active .kgyat-tooltip-box {
          transform: translateY(0);
        }
        .kgyat-tooltip-wrap .kgyat-tooltip-box::before {
          left: 32px;
          margin-left: -7px;
        }
        .kgyat-tooltip-wrap .kgyat-tooltip-box::after {
          left: 32px;
          margin-left: -6px;
        }
      }


      /* About Page - Our Objective Section Exact Height & Vertical Middle Alignment */
      .elementor-element.elementor-element-e3c092b {
        display: flex !important;
        flex-direction: row !important;
        align-items: stretch !important;
        gap: 0 !important;
        --gap: 0px 0px !important;
        --row-gap: 0px !important;
        --column-gap: 0px !important;
        height: 384px !important;
        min-height: 384px !important;
        max-height: 384px !important;
        overflow: hidden !important;
        padding: 0 !important;
        margin-top: 50px !important;
        margin-bottom: 50px !important;
        background-color: #F7F7F7 !important;
        background: #F7F7F7 !important;
        box-sizing: border-box !important;
      }

      .elementor-element.elementor-element-2beb781 {
        width: 50% !important;
        flex: 0 0 50% !important;
        height: 384px !important;
        min-height: 0 !important;
        max-height: 384px !important;
        --min-height: 0px !important;
        background-image: url("/media/wp-content/uploads/2025/05/IMG_0140-1.webp") !important;
        background-size: cover !important;
        background-position: center bottom !important;
        background-repeat: no-repeat !important;
        opacity: 1 !important;
        visibility: visible !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .elementor-element.elementor-element-e1ec765 {
        width: 50% !important;
        flex: 0 0 50% !important;
        height: 384px !important;
        min-height: 0 !important;
        max-height: 384px !important;
        --min-height: 0px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: flex-start !important;
        padding: 25px 45px !important;
        box-sizing: border-box !important;
        background-color: #F7F7F7 !important;
        background: #F7F7F7 !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .elementor-element.elementor-element-e1ec765 .kgyat-title-wrapper {
        margin-bottom: 12px !important;
      }

      .elementor-element.elementor-element-e1ec765 .kgyat-top-label {
        color: #CF3367 !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        margin-bottom: 6px !important;
        line-height: 1.2 !important;
      }

      body #page .elementor-element.elementor-element-e1ec765 .elementor-heading-title,
      body #page .elementor-element.elementor-element-c1336f7 .elementor-heading-title,
      .elementor-element.elementor-element-e1ec765 .elementor-heading-title,
      .elementor-element.elementor-element-c1336f7 .elementor-heading-title {
        font-size: 30px !important;
        font-weight: 700 !important;
        color: #272727 !important;
        line-height: 1.25 !important;
        margin: 0 !important;
      }

      .elementor-element.elementor-element-e1ec765 p {
        font-size: 14.5px !important;
        line-height: 1.55 !important;
        color: #444444 !important;
        margin-bottom: 12px !important;
      }

      body #page .elementor-element.elementor-element-e1ec765 p:last-child,
      body #page .elementor-element.elementor-element-e1ec765 p:last-of-type,
      #page .elementor-element.elementor-element-e1ec765 p:last-child,
      #page .elementor-element.elementor-element-e1ec765 p:last-of-type {
        margin-bottom: 0 !important;
      }

      @media (max-width: 900px) {
        .elementor-element.elementor-element-e3c092b {
          flex-direction: column !important;
          height: auto !important;
          max-height: none !important;
          min-height: auto !important;
        }
        .elementor-element.elementor-element-2beb781 {
          width: 100% !important;
          flex: 1 1 100% !important;
          height: 280px !important;
          max-height: 280px !important;
        }
        .elementor-element.elementor-element-e1ec765 {
          width: 100% !important;
          flex: 1 1 100% !important;
          height: auto !important;
          max-height: none !important;
          padding: 35px 25px !important;
          justify-content: flex-start !important;
        }
      }

      /* Projects Page Hero Headings Styling (Task 1 & Task 2) */
      body #page .elementor-element.elementor-element-6df2e81 .elementor-heading-title,
      body #page .elementor-element.elementor-element-6df2e81 h2,
      .elementor-element-6df2e81 .elementor-heading-title,
      .elementor-element-6df2e81 h2 {
        color: #ffffff !important;
      }

      body #page .elementor-element.elementor-element-6c6d2f2 .elementor-heading-title,
      body #page .elementor-element.elementor-element-6c6d2f2 h2,
      .elementor-element-6c6d2f2 .elementor-heading-title,
      .elementor-element-6c6d2f2 h2 {
        color: #ffffff !important;
        font-size: 20px !important;
      }

      body #page .elementor-element.elementor-element-be1c943 .elementor-heading-title,
      body #page .elementor-element.elementor-element-be1c943 h2,
      .elementor-element-be1c943 .elementor-heading-title,
      .elementor-element-be1c943 h2 {
        color: #ffffff !important;
        font-size: 20px !important;
      }

      /* Homepage Hero Right-Side Animation Logo Size Adjustment (Task 1) */
      .elementor-element-9aa29dc .elementor-element-9e132a0,
      .elementor-element-9e132a0 {
        max-width: 82% !important;
        margin: 0 auto !important;
      }
      .elementor-element-9e132a0 video {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        margin: 0 auto !important;
      }

      /* Projects Page - KGYAT welcomes Heading Color White #ffffff */
      body #page .elementor-element.elementor-element-ddd06f0 .elementor-heading-title,
      body #page .elementor-element.elementor-element-ddd06f0 h1,
      body #page .elementor-element.elementor-element-ddd06f0 h2,
      body #page .elementor-element.elementor-element-ddd06f0 h3,
      .elementor-element-ddd06f0,
      .elementor-element-ddd06f0 h2,
      .elementor-element-ddd06f0 .elementor-heading-title {
        color: #ffffff !important;
      }

      
      /* Contact Us Page Overhauls */
      .kgyat-contact-hero {
        background-position: center center !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
      }
      .kgyat-contact-hero-h1 {
        color: #ffffff !important;
      }
      .kgyat-contact-main {
        background: #f8fafc !important;
      }
      .kgyat-contact-card {
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
      }
      .kgyat-contact-card:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 10px 25px rgba(0, 52, 107, 0.08) !important;
        border-color: #CF3367 !important;
      }
      .kgyat-contact-map-section {
        background: #f8fafc !important;
      }
      body #page .kgyat-contact-left-col h2,
      body #page .kgyat-contact-map-section h2 {
        color: #1e293b !important;
        font-size: 32px !important;
        font-weight: 700 !important;
      }

      /* Projects Page - Redesigned Project Streams at a Glance */
      .elementor-element-b8c981b,
      .kgyat-streams-section {
        background-color: #f8fafc !important;
        padding: 60px 0 !important;
      }
      .kgyat-stream-card {
        background: #ffffff !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 14px !important;
        padding: 32px 26px !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.04) !important;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .kgyat-stream-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 14px 32px rgba(0, 52, 107, 0.1) !important;
        border-color: #CF3367 !important;
      }

      /* ==========================================================================
         KGYAT CTA LANDING PAGE STYLES (#kgyat-cta-landing)
         ========================================================================== */
      .kgyat-landing-container {
        font-family: 'IBM Plex Sans', sans-serif !important;
        color: #1e293b;
        background-color: #ffffff;
        overflow-x: hidden;
      }
      .kgyat-landing-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        box-sizing: border-box;
      }

      /* Hero Section */
      .kgyat-landing-hero {
        background: radial-gradient(circle at 50% 10%, rgba(207, 51, 103, 0.15) 0%, rgba(7, 11, 19, 0.98) 70%), #070b13;
        color: #ffffff;
        padding: 90px 0 80px 0;
        text-align: center;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .kgyat-landing-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(207, 51, 103, 0.15);
        border: 1px solid rgba(207, 51, 103, 0.4);
        color: #ff6b98;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        padding: 6px 16px;
        border-radius: 50px;
        margin-bottom: 24px;
      }
      .kgyat-badge-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #CF3367;
        box-shadow: 0 0 10px #CF3367;
      }
      .kgyat-hero-headline {
        font-size: 48px !important;
        font-weight: 700 !important;
        line-height: 1.18 !important;
        color: #ffffff !important;
        max-width: 980px;
        margin: 0 auto 20px auto !important;
        letter-spacing: -0.5px;
      }
      .kgyat-gradient-text {
        background: linear-gradient(135deg, #ff4d84 0%, #b8479e 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .kgyat-hero-subhead {
        font-size: 19px !important;
        line-height: 1.6 !important;
        color: #cbd5e1 !important;
        max-width: 820px;
        margin: 0 auto 36px auto !important;
        font-weight: 400 !important;
      }
      .kgyat-hero-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-bottom: 60px;
        flex-wrap: wrap;
      }
      .kgyat-primary-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(135deg, #CF3367 0%, #95347C 100%);
        color: #ffffff !important;
        font-size: 16px;
        font-weight: 600;
        padding: 15px 32px;
        border-radius: 8px;
        text-decoration: none !important;
        box-shadow: 0 8px 24px rgba(207, 51, 103, 0.35);
        transition: all 0.3s ease;
      }
      .kgyat-primary-cta-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(207, 51, 103, 0.45);
        background: linear-gradient(135deg, #d83d73 0%, #a23a88 100%);
        color: #ffffff !important;
      }
      .kgyat-secondary-cta-btn {
        display: inline-flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff !important;
        font-size: 16px;
        font-weight: 600;
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none !important;
        transition: all 0.3s ease;
      }
      .kgyat-secondary-cta-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.35);
        color: #ffffff !important;
      }

      /* Quick Metrics Grid */
      .kgyat-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        max-width: 1080px;
        margin: 0 auto;
        padding-top: 30px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      .kgyat-metric-item {
        padding: 10px;
      }
      .kgyat-metric-num {
        font-size: 28px;
        font-weight: 700;
        color: #ff6091;
        margin-bottom: 6px;
      }
      .kgyat-metric-label {
        font-size: 13.5px;
        color: #94a3b8;
        line-height: 1.4;
      }

      /* Section Common Header */
      .kgyat-section-header {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 50px auto;
      }
      .kgyat-section-header .kgyat-top-label {
        color: #CF3367 !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        margin-bottom: 10px !important;
        display: block !important;
      }
      .kgyat-section-title {
        font-size: 36px !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        line-height: 1.25 !important;
        margin: 0 0 16px 0 !important;
      }
      .kgyat-section-subtitle {
        font-size: 16.5px !important;
        line-height: 1.6 !important;
        color: #64748b !important;
        margin: 0 !important;
      }

      /* Features Grid */
      .kgyat-features-section {
        padding: 90px 0;
        background: #f8fafc;
      }
      .kgyat-feature-cards-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
      .kgyat-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 36px 32px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      }
      .kgyat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 28px rgba(0, 52, 107, 0.08);
        border-color: #cbd5e1;
      }
      .kgyat-card-icon {
        width: 52px;
        height: 52px;
        border-radius: 10px;
        background: rgba(207, 51, 103, 0.1);
        color: #CF3367;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        margin-bottom: 20px;
      }
      .kgyat-card h3 {
        font-size: 21px !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        margin: 0 0 12px 0 !important;
      }
      .kgyat-card p {
        font-size: 15.5px !important;
        line-height: 1.65 !important;
        color: #475569 !important;
        margin: 0 !important;
      }

      /* Models Section */
      .kgyat-models-section {
        padding: 90px 0;
        background: #ffffff;
      }
      .kgyat-models-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        align-items: stretch;
      }
      .kgyat-model-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 36px 28px;
        display: flex;
        flex-direction: column;
        position: relative;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
      }
      .kgyat-model-card.featured {
        border-color: #CF3367;
        box-shadow: 0 16px 36px rgba(207, 51, 103, 0.12);
        transform: scale(1.02);
      }
      .kgyat-model-tag {
        align-self: flex-start;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #64748b;
        background: #f1f5f9;
        padding: 4px 10px;
        border-radius: 4px;
        margin-bottom: 18px;
      }
      .kgyat-model-tag.highlight {
        color: #ffffff;
        background: linear-gradient(135deg, #CF3367 0%, #95347C 100%);
      }
      .kgyat-model-card h3 {
        font-size: 22px !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        margin: 0 0 12px 0 !important;
      }
      .kgyat-model-desc {
        font-size: 14.5px !important;
        line-height: 1.6 !important;
        color: #64748b !important;
        margin: 0 0 24px 0 !important;
      }
      .kgyat-model-features {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 0 32px 0 !important;
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex-grow: 1;
      }
      .kgyat-model-features li {
        font-size: 14.5px !important;
        color: #334155 !important;
        line-height: 1.45 !important;
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .kgyat-model-features li i {
        color: #CF3367;
        font-size: 16px;
        margin-top: 2px;
        flex-shrink: 0;
      }
      .kgyat-model-btn {
        display: block;
        text-align: center;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        color: #0f172a !important;
        font-size: 15px;
        font-weight: 600;
        padding: 12px 20px;
        border-radius: 6px;
        text-decoration: none !important;
        transition: all 0.3s ease;
      }
      .kgyat-model-btn:hover {
        background: #0f172a;
        color: #ffffff !important;
        border-color: #0f172a;
      }
      .kgyat-model-btn.highlight {
        background: linear-gradient(135deg, #CF3367 0%, #95347C 100%);
        border: none;
        color: #ffffff !important;
        box-shadow: 0 6px 16px rgba(207, 51, 103, 0.3);
      }
      .kgyat-model-btn.highlight:hover {
        box-shadow: 0 10px 22px rgba(207, 51, 103, 0.45);
        transform: translateY(-2px);
      }

      /* Benchmark Table Section */
      .kgyat-specs-section {
        padding: 90px 0;
        background: #f8fafc;
      }
      .kgyat-table-wrapper {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow-x: auto;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.03);
      }
      .kgyat-benchmark-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 15px;
      }
      .kgyat-benchmark-table th {
        background: #0f172a;
        color: #ffffff;
        padding: 16px 20px;
        font-weight: 600;
        border-bottom: 2px solid #1e293b;
      }
      .kgyat-benchmark-table th.highlight-col {
        background: #182235;
        color: #ff6b98;
        border-bottom: 2px solid #CF3367;
      }
      .kgyat-benchmark-table td {
        padding: 16px 20px;
        border-bottom: 1px solid #e2e8f0;
        color: #475569;
        line-height: 1.5;
      }
      .kgyat-benchmark-table td.highlight-col {
        background: rgba(207, 51, 103, 0.04);
        color: #0f172a;
        border-left: 1px solid rgba(207, 51, 103, 0.15);
        border-right: 1px solid rgba(207, 51, 103, 0.15);
      }
      .kgyat-benchmark-table tbody tr:hover td {
        background-color: #f1f5f9;
      }
      .kgyat-benchmark-table tbody tr:hover td.highlight-col {
        background-color: rgba(207, 51, 103, 0.08);
      }

      /* Inquiry Section & Form */
      .kgyat-inquiry-section {
        padding: 90px 0;
        background: #ffffff;
      }
      .kgyat-inquiry-grid {
        display: grid;
        grid-template-columns: 1fr 1.25fr;
        gap: 50px;
        align-items: flex-start;
      }
      .kgyat-inquiry-info .kgyat-top-label {
        color: #CF3367 !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        margin-bottom: 10px !important;
        display: block !important;
      }
      .kgyat-inquiry-title {
        font-size: 34px !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        line-height: 1.25 !important;
        margin: 0 0 16px 0 !important;
      }
      .kgyat-inquiry-lead {
        font-size: 16px !important;
        line-height: 1.65 !important;
        color: #475569 !important;
        margin: 0 0 32px 0 !important;
      }
      .kgyat-trust-points {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 36px;
      }
      .kgyat-trust-item {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }
      .kgyat-trust-item i {
        font-size: 20px;
        color: #CF3367;
        margin-top: 3px;
        flex-shrink: 0;
      }
      .kgyat-trust-item strong {
        display: block;
        font-size: 16px;
        color: #0f172a;
        margin-bottom: 4px;
      }
      .kgyat-trust-item p {
        font-size: 14px !important;
        color: #64748b !important;
        line-height: 1.5 !important;
        margin: 0 !important;
      }
      .kgyat-direct-contact {
        padding: 16px 20px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 15px;
      }
      .kgyat-direct-contact p {
        margin: 0 !important;
        color: #334155 !important;
      }
      .kgyat-direct-contact a {
        color: #CF3367 !important;
        font-weight: 600;
        text-decoration: none;
      }

      /* Form Card */
      .kgyat-form-card {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 16px;
        padding: 40px 36px;
        box-shadow: 0 15px 35px rgba(0, 52, 107, 0.08);
      }
      .kgyat-form-card-header {
        margin-bottom: 24px;
      }
      .kgyat-form-card-header h3 {
        font-size: 24px !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        margin: 0 0 6px 0 !important;
      }
      .kgyat-form-card-header p {
        font-size: 14px !important;
        color: #64748b !important;
        margin: 0 !important;
      }
      .kgyat-inquiry-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .kgyat-form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .kgyat-field-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .kgyat-field-group label {
        font-size: 13px;
        font-weight: 600;
        color: #334155;
      }
      .kgyat-field-group input,
      .kgyat-field-group select,
      .kgyat-field-group textarea {
        width: 100%;
        padding: 11px 14px;
        font-size: 14.5px;
        font-family: inherit;
        border: 1.5px solid #cbd5e1;
        border-radius: 7px;
        background-color: #ffffff;
        color: #1e293b;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }
      .kgyat-field-group input:focus,
      .kgyat-field-group select:focus,
      .kgyat-field-group textarea:focus {
        outline: none;
        border-color: #CF3367;
        box-shadow: 0 0 0 3px rgba(207, 51, 103, 0.15);
      }
      .kgyat-submit-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: linear-gradient(135deg, #CF3367 0%, #95347C 100%);
        color: #ffffff;
        font-size: 16px;
        font-weight: 600;
        padding: 14px 28px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 6px 18px rgba(207, 51, 103, 0.35);
        margin-top: 6px;
      }
      .kgyat-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(207, 51, 103, 0.45);
      }
      .kgyat-form-privacy-note {
        font-size: 12.5px !important;
        color: #64748b !important;
        text-align: center;
        margin: 6px 0 0 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .kgyat-form-status-container {
        font-size: 14.5px;
        font-weight: 500;
        line-height: 1.4;
      }

      /* FAQ Section */
      .kgyat-faq-section {
        padding: 90px 0;
        background: #f8fafc;
      }
      .kgyat-faq-list {
        max-width: 860px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .kgyat-faq-item {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        overflow: hidden;
        transition: all 0.2s ease;
      }
      .kgyat-faq-item:hover {
        border-color: #cbd5e1;
      }
      .kgyat-faq-question {
        padding: 20px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
      }
      .kgyat-faq-question h4 {
        margin: 0 !important;
        font-size: 16.5px !important;
        font-weight: 600 !important;
        color: #0f172a !important;
      }
      .kgyat-faq-question i {
        color: #CF3367;
        font-size: 14px;
        transition: transform 0.2s ease;
      }
      .kgyat-faq-item.active .kgyat-faq-question i {
        transform: rotate(180deg);
      }
      .kgyat-faq-answer {
        padding: 0 24px 22px 24px;
        display: none;
      }
      .kgyat-faq-item.active .kgyat-faq-answer {
        display: block;
      }
      .kgyat-faq-answer p {
        margin: 0 !important;
        font-size: 15px !important;
        line-height: 1.65 !important;
        color: #475569 !important;
      }

      /* Bottom Full Banner */
      .kgyat-bottom-banner {
        background: radial-gradient(circle at 50% 50%, rgba(207, 51, 103, 0.25) 0%, rgba(7, 11, 19, 0.98) 75%), #070b13;
        color: #ffffff;
        padding: 85px 0;
        text-align: center;
      }
      .kgyat-bottom-banner h2 {
        font-size: 38px !important;
        font-weight: 700 !important;
        line-height: 1.25 !important;
        color: #ffffff !important;
        max-width: 900px;
        margin: 0 auto 16px auto !important;
      }
      .kgyat-bottom-banner p {
        font-size: 18px !important;
        color: #cbd5e1 !important;
        margin: 0 auto 32px auto !important;
        max-width: 600px;
      }
      .kgyat-banner-cta-btn {
        display: inline-flex;
        align-items: center;
        background: linear-gradient(135deg, #CF3367 0%, #95347C 100%);
        color: #ffffff !important;
        font-size: 16.5px;
        font-weight: 600;
        padding: 16px 36px;
        border-radius: 8px;
        text-decoration: none !important;
        box-shadow: 0 8px 24px rgba(207, 51, 103, 0.4);
        transition: all 0.3s ease;
      }
      .kgyat-banner-cta-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(207, 51, 103, 0.5);
      }

      /* Responsive Media Queries */
      @media (max-width: 1024px) {
        .kgyat-hero-headline {
          font-size: 40px !important;
        }
        .kgyat-models-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .kgyat-model-card.featured {
          transform: none;
        }
        .kgyat-inquiry-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }
      @media (max-width: 768px) {
        .kgyat-landing-hero {
          padding: 60px 0 50px 0;
        }
        .kgyat-hero-headline {
          font-size: 32px !important;
        }
        .kgyat-hero-subhead {
          font-size: 16.5px !important;
        }
        .kgyat-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .kgyat-feature-cards-grid {
          grid-template-columns: 1fr;
        }
        .kgyat-form-row {
          grid-template-columns: 1fr;
        }
        .kgyat-form-card {
          padding: 28px 20px;
        }
        .kgyat-section-title {
          font-size: 28px !important;
        }
        .kgyat-bottom-banner h2 {
          font-size: 28px !important;
        }
      }

    `;
