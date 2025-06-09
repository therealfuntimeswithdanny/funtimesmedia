        document.addEventListener('DOMContentLoaded', function() {
            const iconSearchInput = document.getElementById('iconSearchInput');
            const searchResultsContainer = document.getElementById('searchResults');
            const noResultsMessage = document.getElementById('noResultsMessage');
            const filterRadios = document.querySelectorAll('input[name="iconFilter"]');

            const editModal = document.getElementById('editModal');
            const closeModalBtn = editModal.querySelector('.close-button');
            const modalIconPreview = document.getElementById('modalIconPreview');
            const iconSizeSelect = document.getElementById('iconSize');
            const iconColorInput = document.getElementById('iconColor');
            const copyEditedCodeBtn = document.getElementById('copyEditedCodeBtn');

            let currentFilter = 'all'; // Default filter
            let currentIcon = null; // Stores the original icon object being edited

            // Expanded list of Font Awesome icons with 'type' property
            // Filtered for uniqueness and limited to 500
            const rawIcons = [
                { name: 'house', class: 'fa-solid fa-house', type: 'solid' },
                { name: 'user', class: 'fa-solid fa-user', type: 'solid' },
                { name: 'gear', class: 'fa-solid fa-gear', type: 'solid' },
                { name: 'magnifying-glass', class: 'fa-solid fa-magnifying-glass', type: 'solid' },
                { name: 'heart', class: 'fa-solid fa-heart', type: 'solid' },
                { name: 'star', class: 'fa-solid fa-star', type: 'solid' },
                { name: 'cloud', class: 'fa-solid fa-cloud', type: 'solid' },
                { name: 'bell', class: 'fa-solid fa-bell', type: 'solid' },
                { name: 'envelope', class: 'fa-solid fa-envelope', type: 'solid' },
                { name: 'camera', class: 'fa-solid fa-camera', type: 'solid' },
                { name: 'trash', class: 'fa-solid fa-trash', type: 'solid' },
                { name: 'pencil', class: 'fa-solid fa-pencil', type: 'solid' },
                { name: 'download', class: 'fa-solid fa-download', type: 'solid' },
                { name: 'upload', class: 'fa-solid fa-upload', type: 'solid' },
                { name: 'chart-line', class: 'fa-solid fa-chart-line', type: 'solid' },
                { name: 'car', class: 'fa-solid fa-car', type: 'solid' },
                { name: 'bolt', class: 'fa-solid fa-bolt', type: 'solid' },
                { name: 'coffee', class: 'fa-solid fa-coffee', type: 'solid' },
                { name: 'moon', class: 'fa-solid fa-moon', type: 'solid' },
                { name: 'sun', class: 'fa-solid fa-sun', type: 'solid' },
                { name: 'cube', class: 'fa-solid fa-cube', type: 'solid' },
                { name: 'arrow-right', class: 'fa-solid fa-arrow-right', type: 'solid' },
                { name: 'arrow-left', class: 'fa-solid fa-arrow-left', type: 'solid' },
                { name: 'arrow-up', class: 'fa-solid fa-arrow-up', type: 'solid' },
                { name: 'arrow-down', class: 'fa-solid fa-arrow-down', type: 'solid' },
                { name: 'circle-check', class: 'fa-solid fa-circle-check', type: 'solid' },
                { name: 'triangle-exclamation', class: 'fa-solid fa-triangle-exclamation', type: 'solid' },
                { name: 'share-nodes', class: 'fa-solid fa-share-nodes', type: 'solid' },
                { name: 'bars', class: 'fa-solid fa-bars', type: 'solid' },
                { name: 'xmark', class: 'fa-solid fa-xmark', type: 'solid' },
                { name: 'check', class: 'fa-solid fa-check', type: 'solid' },
                { name: 'info', class: 'fa-solid fa-info', type: 'solid' },
                { name: 'exclamation', class: 'fa-solid fa-exclamation', type: 'solid' },
                { name: 'question', class: 'fa-solid fa-question', type: 'solid' },
                { name: 'location-dot', class: 'fa-solid fa-location-dot', type: 'solid' },
                { name: 'phone', class: 'fa-solid fa-phone', type: 'solid' },
                { name: 'calendar-days', class: 'fa-solid fa-calendar-days', type: 'solid' },
                { name: 'clock', class: 'fa-solid fa-clock', type: 'solid' },
                { name: 'image', class: 'fa-solid fa-image', type: 'solid' },
                { name: 'video', class: 'fa-solid fa-video', type: 'solid' },
                { name: 'music', class: 'fa-solid fa-music', type: 'solid' },
                { name: 'file', class: 'fa-solid fa-file', type: 'solid' },
                { name: 'folder', class: 'fa-solid fa-folder', type: 'solid' },
                { name: 'print', class: 'fa-solid fa-print', type: 'solid' },
                { name: 'cart-shopping', class: 'fa-solid fa-cart-shopping', type: 'solid' },
                { name: 'credit-card', class: 'fa-solid fa-credit-card', type: 'solid' },
                { name: 'money-bill', class: 'fa-solid fa-money-bill', type: 'solid' },
                { name: 'wallet', class: 'fa-solid fa-wallet', type: 'solid' },
                { name: 'gift', class: 'fa-solid fa-gift', type: 'solid' },
                { name: 'lightbulb', class: 'fa-solid fa-lightbulb', type: 'solid' },
                { name: 'map', class: 'fa-solid fa-map', type: 'solid' },
                { name: 'earth-americas', class: 'fa-solid fa-earth-americas', type: 'solid' },
                { name: 'globe', class: 'fa-solid fa-globe', type: 'solid' },
                { name: 'wifi', class: 'fa-solid fa-wifi', type: 'solid' },
                { name: 'battery-full', class: 'fa-solid fa-battery-full', type: 'solid' },
                { name: 'lock', class: 'fa-solid fa-lock', type: 'solid' },
                { name: 'unlock', class: 'fa-solid fa-unlock', type: 'solid' },
                { name: 'key', class: 'fa-solid fa-key', type: 'solid' },
                { name: 'bug', class: 'fa-solid fa-bug', type: 'solid' },
                { name: 'code', class: 'fa-solid fa-code', type: 'solid' },
                { name: 'terminal', class: 'fa-solid fa-terminal', type: 'solid' },
                { name: 'server', class: 'fa-solid fa-server', type: 'solid' },
                { name: 'database', class: 'fa-solid fa-database', type: 'solid' },
                { name: 'cloud-arrow-down', class: 'fa-solid fa-cloud-arrow-down', type: 'solid' },
                { name: 'cloud-arrow-up', class: 'fa-solid fa-cloud-arrow-up', type: 'solid' },
                { name: 'robot', class: 'fa-solid fa-robot', type: 'solid' },
                { name: 'shield-alt', class: 'fa-solid fa-shield-alt', type: 'solid' },
                { name: 'fingerprint', class: 'fa-solid fa-fingerprint', type: 'solid' },
                { name: 'eye', class: 'fa-solid fa-eye', type: 'solid' },
                { name: 'eye-slash', class: 'fa-solid fa-eye-slash', type: 'solid' },
                { name: 'comment', class: 'fa-solid fa-comment', type: 'solid' },
                { name: 'comments', class: 'fa-solid fa-comments', type: 'solid' },
                { name: 'quote-left', class: 'fa-solid fa-quote-left', type: 'solid' },
                { name: 'quote-right', class: 'fa-solid fa-quote-right', type: 'solid' },
                { name: 'paperclip', class: 'fa-solid fa-paperclip', type: 'solid' },
                { name: 'link', class: 'fa-solid fa-link', type: 'solid' },
                { name: 'unlink', class: 'fa-solid fa-unlink', type: 'solid' },
                { name: 'thumbtack', class: 'fa-solid fa-thumbtack', type: 'solid' },
                { name: 'bookmark', class: 'fa-solid fa-bookmark', type: 'solid' },
                { name: 'tag', class: 'fa-solid fa-tag', type: 'solid' },
                { name: 'tags', class: 'fa-solid fa-tags', type: 'solid' },
                { name: 'box', class: 'fa-solid fa-box', type: 'solid' },
                { name: 'truck', class: 'fa-solid fa-truck', type: 'solid' },
                { name: 'plane', class: 'fa-solid fa-plane', type: 'solid' },
                { name: 'ship', class: 'fa-solid fa-ship', type: 'solid' },
                { name: 'train', class: 'fa-solid fa-train', type: 'solid' },
                { name: 'subway', class: 'fa-solid fa-subway', type: 'solid' },
                { name: 'bus', class: 'fa-solid fa-bus', type: 'solid' },
                { name: 'bicycle', class: 'fa-solid fa-bicycle', type: 'solid' },
                { name: 'walking', class: 'fa-solid fa-walking', type: 'solid' },
                { name: 'running', class: 'fa-solid fa-running', type: 'solid' },
                { name: 'swimmer', class: 'fa-solid fa-swimmer', type: 'solid' },
                { name: 'person-biking', class: 'fa-solid fa-person-biking', type: 'solid' },
                { name: 'dumbbell', class: 'fa-solid fa-dumbbell', type: 'solid' },
                { name: 'handshake', class: 'fa-solid fa-handshake', type: 'solid' },
                { name: 'gavel', class: 'fa-solid fa-gavel', type: 'solid' },
                { name: 'scale-balanced', class: 'fa-solid fa-scale-balanced', type: 'solid' },
                { name: 'chart-pie', class: 'fa-solid fa-chart-pie', type: 'solid' },
                { name: 'percent', class: 'fa-solid fa-percent', type: 'solid' },
                { name: 'dollar-sign', class: 'fa-solid fa-dollar-sign', type: 'solid' },
                { name: 'euro-sign', class: 'fa-solid fa-euro-sign', type: 'solid' },
                { name: 'pound-sign', class: 'fa-solid fa-pound-sign', type: 'solid' },
                { name: 'yen-sign', class: 'fa-solid fa-yen-sign', type: 'solid' },
                { name: 'rupee-sign', class: 'fa-solid fa-rupee-sign', type: 'solid' },
                { name: 'file-alt', class: 'fa-solid fa-file-alt', type: 'solid' },
                { name: 'clipboard', class: 'fa-solid fa-clipboard', type: 'solid' },
                { name: 'paste', class: 'fa-solid fa-paste', type: 'solid' },
                { name: 'cut', class: 'fa-solid fa-cut', type: 'solid' },
                { name: 'copy', class: 'fa-solid fa-copy', type: 'solid' },
                { name: 'save', class: 'fa-solid fa-save', type: 'solid' },
                { name: 'folder-open', class: 'fa-solid fa-folder-open', type: 'solid' },
                { name: 'sitemap', class: 'fa-solid fa-sitemap', type: 'solid' },
                { name: 'cogs', class: 'fa-solid fa-cogs', type: 'solid' },
                { name: 'wrench', class: 'fa-solid fa-wrench', type: 'solid' },
                { name: 'hammer', class: 'fa-solid fa-hammer', type: 'solid' },
                { name: 'tools', class: 'fa-solid fa-tools', type: 'solid' },
                { name: 'screwdriver', class: 'fa-solid fa-screwdriver', type: 'solid' },
                { name: 'magnifying-glass-plus', class: 'fa-solid fa-magnifying-glass-plus', type: 'solid' },
                { name: 'magnifying-glass-minus', class: 'fa-solid fa-magnifying-glass-minus', type: 'solid' },
                { name: 'home-alt', class: 'fa-solid fa-home-alt', type: 'solid' },
                { name: 'address-book', class: 'fa-solid fa-address-book', type: 'solid' },
                { name: 'address-card', class: 'fa-solid fa-address-card', type: 'solid' },
                { name: 'id-card', class: 'fa-solid fa-id-card', type: 'solid' },
                { name: 'envelope-open', class: 'fa-solid fa-envelope-open', type: 'solid' },
                { name: 'phone-alt', class: 'fa-solid fa-phone-alt', type: 'solid' },
                { name: 'mobile-alt', class: 'fa-solid fa-mobile-alt', type: 'solid' },
                { name: 'desktop', class: 'fa-solid fa-desktop', type: 'solid' },
                { name: 'tablet-alt', class: 'fa-solid fa-tablet-alt', type: 'solid' },
                { name: 'laptop', class: 'fa-solid fa-laptop', type: 'solid' },
                { name: 'keyboard', class: 'fa-solid fa-keyboard', type: 'solid' },
                { name: 'mouse', class: 'fa-solid fa-mouse', type: 'solid' },
                { name: 'gamepad', class: 'fa-solid fa-gamepad', type: 'solid' },
                { name: 'headset', class: 'fa-solid fa-headset', type: 'solid' },
                { name: 'microphone', class: 'fa-solid fa-microphone', type: 'solid' },
                { name: 'microphone-alt', class: 'fa-solid fa-microphone-alt', type: 'solid' },
                { name: 'volume-up', class: 'fa-solid fa-volume-up', type: 'solid' },
                { name: 'volume-down', class: 'fa-solid fa-volume-down', type: 'solid' },
                { name: 'volume-mute', class: 'fa-solid fa-volume-mute', type: 'solid' },
                { name: 'bell-slash', class: 'fa-solid fa-bell-slash', type: 'solid' },
                { name: 'bullhorn', class: 'fa-solid fa-bullhorn', type: 'solid' },
                { name: 'certificate', class: 'fa-solid fa-certificate', type: 'solid' },
                { name: 'trophy', class: 'fa-solid fa-trophy', type: 'solid' },
                { name: 'medal', class: 'fa-solid fa-medal', type: 'solid' },
                { name: 'award', class: 'fa-solid fa-award', type: 'solid' },
                { name: 'graduation-cap', class: 'fa-solid fa-graduation-cap', type: 'solid' },
                { name: 'school', class: 'fa-solid fa-school', type: 'solid' },
                { name: 'university', class: 'fa-solid fa-university', type: 'solid' },
                { name: 'book', class: 'fa-solid fa-book', type: 'solid' },
                { name: 'book-open', class: 'fa-solid fa-book-open', type: 'solid' },
                { name: 'pen-nib', class: 'fa-solid fa-pen-nib', type: 'solid' },
                { name: 'marker', class: 'fa-solid fa-marker', type: 'solid' },
                { name: 'highlighter', class: 'fa-solid fa-highlighter', type: 'solid' },
                { name: 'paint-brush', class: 'fa-solid fa-paint-brush', type: 'solid' },
                { name: 'palette', class: 'fa-solid fa-palette', type: 'solid' },
                { name: 'spray-can', class: 'fa-solid fa-spray-can', type: 'solid' },
                { name: 'fill-drip', class: 'fa-solid fa-fill-drip', type: 'solid' },
                { name: 'stamp', class: 'fa-solid fa-stamp', type: 'solid' },
                { name: 'compass', class: 'fa-solid fa-compass', type: 'solid' },
                { name: 'map-marker-alt', class: 'fa-solid fa-map-marker-alt', type: 'solid' },
                { name: 'map-pin', class: 'fa-solid fa-map-pin', type: 'solid' },
                { name: 'directions', class: 'fa-solid fa-directions', type: 'solid' },
                { name: 'road', class: 'fa-solid fa-road', type: 'solid' },
                { name: 'route', class: 'fa-solid fa-route', type: 'solid' },
                { name: 'bus-alt', class: 'fa-solid fa-bus-alt', type: 'solid' },
                { name: 'taxi', class: 'fa-solid fa-taxi', type: 'solid' },
                { name: 'shuttle-van', class: 'fa-solid fa-shuttle-van', type: 'solid' },
                { name: 'gas-pump', class: 'fa-solid fa-gas-pump', type: 'solid' },
                { name: 'seedling', class: 'fa-solid fa-seedling', type: 'solid' },
                { name: 'leaf', class: 'fa-solid fa-leaf', type: 'solid' },
                { name: 'tree', class: 'fa-solid fa-tree', type: 'solid' },
                { name: 'mountain', class: 'fa-solid fa-mountain', type: 'solid' },
                { name: 'water', class: 'fa-solid fa-water', type: 'solid' },
                { name: 'umbrella', class: 'fa-solid fa-umbrella', type: 'solid' },
                { name: 'cloud-sun', class: 'fa-solid fa-cloud-sun', type: 'solid' },
                { name: 'cloud-moon', class: 'fa-solid fa-cloud-moon', type: 'solid' },
                { name: 'snowflake', class: 'fa-solid fa-snowflake', type: 'solid' },
                { name: 'fire', class: 'fa-solid fa-fire', type: 'solid' },
                { name: 'fist-raised', class: 'fa-solid fa-fist-raised', type: 'solid' },
                { name: 'hand-sparkles', class: 'fa-solid fa-hand-sparkles', type: 'solid' },
                { name: 'heartbeat', class: 'fa-solid fa-heartbeat', type: 'solid' },
                { name: 'stethoscope', class: 'fa-solid fa-stethoscope', type: 'solid' },
                { name: 'hospital', class: 'fa-solid fa-hospital', type: 'solid' },
                { name: 'syringe', class: 'fa-solid fa-syringe', type: 'solid' },
                { name: 'pills', class: 'fa-solid fa-pills', type: 'solid' },
                { name: 'band-aid', class: 'fa-solid fa-band-aid', type: 'solid' },
                { name: 'first-aid', class: 'fa-solid fa-first-aid', type: 'solid' },
                { name: 'dna', class: 'fa-solid fa-dna', type: 'solid' },
                { name: 'microscope', class: 'fa-solid fa-microscope', type: 'solid' },
                { name: 'flask', class: 'fa-solid fa-flask', type: 'solid' },
                { name: 'atom', class: 'fa-solid fa-atom', type: 'solid' },
                { name: 'brain', class: 'fa-solid fa-brain', type: 'solid' },
                { name: 'cookie', class: 'fa-solid fa-cookie', type: 'solid' },
                { name: 'burger', class: 'fa-solid fa-burger', type: 'solid' },
                { name: 'pizza-slice', class: 'fa-solid fa-pizza-slice', type: 'solid' },
                { name: 'ice-cream', class: 'fa-solid fa-ice-cream', type: 'solid' },
                { name: 'egg', class: 'fa-solid fa-egg', type: 'solid' },
                { name: 'carrot', class: 'fa-solid fa-carrot', type: 'solid' },
                { name: 'apple-whole', class: 'fa-solid fa-apple-whole', type: 'solid' },
                // Brand Icons
                { name: 'github', class: 'fa-brands fa-github', type: 'brand' },
                { name: 'x-twitter', class: 'fa-brands fa-x-twitter', type: 'brand' },
                { name: 'facebook-f', class: 'fa-brands fa-facebook-f', type: 'brand' },
                { name: 'instagram', class: 'fa-brands fa-instagram', type: 'brand' },
                { name: 'youtube', class: 'fa-brands fa-youtube', type: 'brand' },
                { name: 'linkedin-in', class: 'fa-brands fa-linkedin-in', type: 'brand' },
                { name: 'pinterest', class: 'fa-brands fa-pinterest', type: 'brand' },
                { name: 'snapchat-ghost', class: 'fa-brands fa-snapchat-ghost', type: 'brand' },
                { name: 'tiktok', class: 'fa-brands fa-tiktok', type: 'brand' },
                { name: 'whatsapp', class: 'fa-brands fa-whatsapp', type: 'brand' },
                { name: 'reddit', class: 'fa-brands fa-reddit', type: 'brand' },
                { name: 'discord', class: 'fa-brands fa-discord', type: 'brand' },
                { name: 'apple', class: 'fa-brands fa-apple', type: 'brand' },
                { name: 'google', class: 'fa-brands fa-google', type: 'brand' },
                { name: 'windows', class: 'fa-brands fa-windows', type: 'brand' },
                { name: 'amazon', class: 'fa-brands fa-amazon', type: 'brand' },
                { name: 'paypal', class: 'fa-brands fa-paypal', type: 'brand' },
                { name: 'stripe', class: 'fa-brands fa-stripe', type: 'brand' },
                { name: 'cc-visa', class: 'fa-brands fa-cc-visa', type: 'brand' },
                { name: 'cc-mastercard', class: 'fa-brands fa-cc-mastercard', type: 'brand' },
                { name: 'spotify', class: 'fa-brands fa-spotify', type: 'brand' },
                { name: 'twitch', class: 'fa-brands fa-twitch', type: 'brand' },
                { name: 'slack', class: 'fa-brands fa-slack', type: 'brand' },
                { name: 'figma', class: 'fa-brands fa-figma', type: 'brand' },
                { name: 'html5', class: 'fa-brands fa-html5', type: 'brand' },
                { name: 'css3', class: 'fa-brands fa-css3', type: 'brand' },
                { name: 'js', class: 'fa-brands fa-js', type: 'brand' },
                { name: 'vuejs', class: 'fa-brands fa-vuejs', type: 'brand' },
                { name: 'angular', class: 'fa-brands fa-angular', type: 'brand' },
                { name: 'react', class: 'fa-brands fa-react', type: 'brand' },
                { name: 'node-js', class: 'fa-brands fa-node-js', type: 'brand' },
                { name: 'php', class: 'fa-brands fa-php', type: 'brand' },
                { name: 'python', class: 'fa-brands fa-python', type: 'brand' },
                { name: 'java', class: 'fa-brands fa-java', type: 'brand' },
                { name: 'git', class: 'fa-brands fa-git-alt', type: 'brand' },
                { name: 'wordpress', class: 'fa-brands fa-wordpress', type: 'brand' },
                { name: 'shopify', class: 'fa-brands fa-shopify', type: 'brand' },
                { name: 'amazon-pay', class: 'fa-brands fa-amazon-pay', type: 'brand' },
                { name: 'apple-pay', class: 'fa-brands fa-apple-pay', type: 'brand' },
                { name: 'google-pay', class: 'fa-brands fa-google-pay', type: 'brand' },
                { name: 'docker', class: 'fa-brands fa-docker', type: 'brand' },
                { name: 'aws', class: 'fa-brands fa-aws', type: 'brand' },
                { name: 'azure', class: 'fa-brands fa-azure', type: 'brand' },
                { name: 'google-drive', class: 'fa-brands fa-google-drive', type: 'brand' },
                { name: 'dropbox', class: 'fa-brands fa-dropbox', type: 'brand' },
                { name: 'npm', class: 'fa-brands fa-npm', type: 'brand' },
                { name: 'yarn', class: 'fa-brands fa-yarn', type: 'brand' },
                { name: 'ubuntu', class: 'fa-brands fa-ubuntu', type: 'brand' },
                { name: 'linux', class: 'fa-brands fa-linux', type: 'brand' },
                { name: 'android', class: 'fa-brands fa-android', type: 'brand' },
                { name: 'apple-ios', class: 'fa-brands fa-apple-pay', type: 'brand' },
                { name: 'safari', class: 'fa-brands fa-safari', type: 'brand' },
                { name: 'chrome', class: 'fa-brands fa-chrome', type: 'brand' },
                { name: 'firefox', class: 'fa-brands fa-firefox', type: 'brand' },
                { name: 'edge', class: 'fa-brands fa-edge', type: 'brand' },
                { name: 'opera', class: 'fa-brands fa-opera', type: 'brand' },
                { name: 'stack-overflow', class: 'fa-brands fa-stack-overflow', type: 'brand' },
                { name: 'medium', class: 'fa-brands fa-medium', type: 'brand' },
                { name: 'dev', class: 'fa-brands fa-dev', type: 'brand' },
                { name: 'slack-hash', class: 'fa-brands fa-slack-hash', type: 'brand' },
                { name: 'joomla', class: 'fa-brands fa-joomla', type: 'brand' },
                { name: 'drupal', class: 'fa-brands fa-drupal', type: 'brand' },
                { name: 'magento', class: 'fa-brands fa-magento', type: 'brand' },
                { name: 'kickstarter', class: 'fa-brands fa-kickstarter', type: 'brand' },
                { name: 'patreon', class: 'fa-brands fa-patreon', type: 'brand' },
                { name: 'etsy', class: 'fa-brands fa-etsy', type: 'brand' },
                { name: 'behance', class: 'fa-brands fa-behance', type: 'brand' },
                { name: 'dribbble', class: 'fa-brands fa-dribbble', type: 'brand' },
                { name: 'flickr', class: 'fa-brands fa-flickr', type: 'brand' },
                { name: 'slideshare', class: 'fa-brands fa-slideshare', type: 'brand' },
                { name: 'vimeo', class: 'fa-brands fa-vimeo', type: 'brand' },
                { name: 'soundcloud', class: 'fa-brands fa-soundcloud', type: 'brand' },
                { name: 'lastfm', class: 'fa-brands fa-lastfm', type: 'brand' },
                { name: 'mixcloud', class: 'fa-brands fa-mixcloud', type: 'brand' },
                { name: 'bandcamp', class: 'fa-brands fa-bandcamp', type: 'brand' },
                { name: 'itunes', class: 'fa-brands fa-itunes', type: 'brand' },
                { name: 'google-play', class: 'fa-brands fa-google-play', type: 'brand' },
                { name: 'app-store', class: 'fa-brands fa-app-store', type: 'brand' },
                { name: 'unity', class: 'fa-brands fa-unity', type: 'brand' },
                { name: 'steam', class: 'fa-brands fa-steam', type: 'brand' },
                { name: 'xbox', class: 'fa-brands fa-xbox', type: 'brand' },
                { name: 'playstation', class: 'fa-brands fa-playstation', type: 'brand' },
                { name: 'nintendo-switch', class: 'fa-brands fa-nintendo-switch', type: 'brand' },
                { name: 'maxcdn', class: 'fa-brands fa-maxcdn', type: 'brand' },
                { name: 'bootstrap', class: 'fa-brands fa-bootstrap', type: 'brand' },
                { name: 'sass', class: 'fa-brands fa-sass', type: 'brand' },
                { name: 'less', class: 'fa-brands fa-less', type: 'brand' },
                { name: 'gulp', class: 'fa-brands fa-gulp', type: 'brand' },
                { name: 'grunt', class: 'fa-brands fa-grunt', type: 'brand' },
                { name: 'babel', class: 'fa-brands fa-babel', type: 'brand' },
                { name: 'webpack', class: 'fa-brands fa-webpack', type: 'brand' },
                { name: 'symfony', class: 'fa-brands fa-symfony', type: 'brand' },
                { name: 'laravel', class: 'fa-brands fa-laravel', type: 'brand' },
                { name: 'gitlab', class: 'fa-brands fa-gitlab', type: 'brand' },
                { name: 'bitbucket', class: 'fa-brands fa-bitbucket', type: 'brand' },
                { name: 'digital-ocean', class: 'fa-brands fa-digital-ocean', type: 'brand' },
                { name: 'vimeo-v', class: 'fa-brands fa-vimeo-v', type: 'brand' },
                { name: 'untappd', class: 'fa-brands fa-untappd', type: 'brand' },
                { name: 'yelp', class: 'fa-brands fa-yelp', type: 'brand' },
                { name: 'cc-stripe', class: 'fa-brands fa-cc-stripe', type: 'brand' },
                { name: 'cc-paypal', class: 'fa-brands fa-cc-paypal', type: 'brand' },
                { name: 'cc-amazon-pay', class: 'fa-brands fa-cc-amazon-pay', type: 'brand' },
                { name: 'hotjar', class: 'fa-brands fa-hotjar', type: 'brand' },
                { name: 'jira', class: 'fa-brands fa-jira', type: 'brand' },
                { name: 'confluence', class: 'fa-brands fa-confluence', type: 'brand' },
                { name: 'trello', class: 'fa-brands fa-trello', type: 'brand' },
                { name: 'atlassian', class: 'fa-brands fa-atlassian', type: 'brand' },
                { name: 'buffer', class: 'fa-brands fa-buffer', type: 'brand' },
                { name: 'contao', class: 'fa-brands fa-contao', type: 'brand' },
                { name: 'expeditedssl', class: 'fa-brands fa-expeditedssl', type: 'brand' },
                { name: 'fort-awesome', class: 'fa-brands fa-fort-awesome', type: 'brand' },
                { name: 'free-code-camp', class: 'fa-brands fa-free-code-camp', type: 'brand' },
                { name: 'goodreads', class: 'fa-brands fa-goodreads', type: 'brand' },
                { name: 'google-wallet', class: 'fa-brands fa-google-wallet', type: 'brand' },
                { name: 'houzz', class: 'fa-brands fa-houzz', type: 'brand' },
                { name: 'ioxhost', class: 'fa-brands fa-ioxhost', type: 'brand' },
                { name: 'jenkins', class: 'fa-brands fa-jenkins', type: 'brand' },
                { name: 'jsfiddle', class: 'fa-brands fa-jsfiddle', type: 'brand' },
                { name: 'linode', class: 'fa-brands fa-linode', type: 'brand' },
                { name: 'meanpath', class: 'fa-brands fa-meanpath', type: 'brand' },
                { name: 'optin-monster', class: 'fa-brands fa-optin-monster', type: 'brand' },
                { name: 'pagelines', class: 'fa-brands fa-pagelines', type: 'brand' },
                { name: 'periscope', class: 'fa-brands fa-periscope', type: 'brand' },
                { name: 'pied-piper', class: 'fa-brands fa-pied-piper', type: 'brand' },
                { name: 'product-hunt', class: 'fa-brands fa-product-hunt', type: 'brand' },
                { name: 'ravelry', class: 'fa-brands fa-ravelry', type: 'brand' },
                { name: 'scribd', class: 'fa-brands fa-scribd', type: 'brand' },
                { name: 'sellsy', class: 'fa-brands fa-sellsy', type: 'brand' },
                { name: 'shirtsinbulk', class: 'fa-brands fa-shirtsinbulk', type: 'brand' },
                { name: 'simplybuilt', class: 'fa-brands fa-simplybuilt', type: 'brand' },
                { name: 'skyatlas', class: 'fa-brands fa-skyatlas', type: 'brand' },
                { name: 'speakap', class: 'fa-brands fa-speakap', type: 'brand' },
                { name: 'stack-exchange', class: 'fa-brands fa-stack-exchange', type: 'brand' },
                { name: 'steam-symbol', class: 'fa-brands fa-steam-symbol', type: 'brand' },
                { name: 'sticker-mule', class: 'fa-brands fa-sticker-mule', type: 'brand' },
                { name: 'studiovinari', class: 'fa-brands fa-studiovinari', type: 'brand' },
                { name: 'tencent-weibo', class: 'fa-brands fa-tencent-weibo', type: 'brand' },
                { name: 'themeco', class: 'fa-brands fa-themeco', type: 'brand' },
                { name: 'tripadvisor', class: 'fa-brands fa-tripadvisor', type: 'brand' },
                { name: 'tumblr', class: 'fa-brands fa-tumblr', type: 'brand' },
                { name: 'typo3', class: 'fa-brands fa-typo3', type: 'brand' },
                { name: 'uber', class: 'fa-brands fa-uber', type: 'brand' },
                { name: 'uikit', class: 'fa-brands fa-uikit', type: 'brand' },
                { name: 'uncharted', class: 'fa-brands fa-uncharted', type: 'brand' },
                { name: 'unsplash', class: 'fa-brands fa-unsplash', type: 'brand' },
                { name: 'usb', class: 'fa-brands fa-usb', type: 'brand' },
                { name: 'usps', class: 'fa-brands fa-usps', type: 'brand' },
                { name: 'ussunnah', class: 'fa-brands fa-ussunnah', type: 'brand' },
                { name: 'vaadin', class: 'fa-brands fa-vaadin', type: 'brand' },
                { name: 'viacoin', class: 'fa-brands fa-viacoin', type: 'brand' },
                { name: 'viber', class: 'fa-brands fa-viber', type: 'brand' },
                { name: 'vimeo-square', class: 'fa-brands fa-vimeo-square', type: 'brand' },
                { name: 'vk', class: 'fa-brands fa-vk', type: 'brand' },
                { name: 'vnv', class: 'fa-brands fa-vnv', type: 'brand' },
                { name: 'wizards-of-the-coast', class: 'fa-brands fa-wizards-of-the-coast', type: 'brand' },
                { name: 'wolf-pack-battalion', class: 'fa-brands fa-wolf-pack-battalion', type: 'brand' },
                { name: 'wordpress-simple', class: 'fa-brands fa-wordpress-simple', type: 'brand' },
                { name: 'wpbeginner', class: 'fa-brands fa-wpbeginner', type: 'brand' },
                { name: 'wpexplorer', class: 'fa-brands fa-wpexplorer', type: 'brand' },
                { name: 'yandex', class: 'fa-brands fa-yandex', type: 'brand' },
                { name: 'yandex-international', class: 'fa-brands fa-yandex-international', type: 'brand' },
                { name: 'yoast', class: 'fa-brands fa-yoast', type: 'brand' },
                { name: 'zhihu', class: 'fa-brands fa-zhihu', type: 'brand' },
                { name: 'circle-arrow-left', class: 'fa-solid fa-circle-arrow-left', type: 'solid' },
                { name: 'circle-arrow-right', class: 'fa-solid fa-circle-arrow-right', type: 'solid' },
                { name: 'circle-arrow-up', class: 'fa-solid fa-circle-arrow-up', type: 'solid' },
                { name: 'circle-arrow-down', class: 'fa-solid fa-circle-arrow-down', type: 'solid' },
                { name: 'square-arrow-left', class: 'fa-solid fa-square-arrow-left', type: 'solid' },
                { name: 'square-arrow-right', class: 'fa-solid fa-square-arrow-right', type: 'solid' },
                { name: 'square-arrow-up', class: 'fa-solid fa-square-arrow-up', type: 'solid' },
                { name: 'square-arrow-down', class: 'fa-solid fa-square-arrow-down', type: 'solid' },
                { name: 'chevron-left', class: 'fa-solid fa-chevron-left', type: 'solid' },
                { name: 'chevron-right', class: 'fa-solid fa-chevron-right', type: 'solid' },
                { name: 'chevron-up', class: 'fa-solid fa-chevron-up', type: 'solid' },
                { name: 'chevron-down', class: 'fa-solid fa-chevron-down', type: 'solid' },
                { name: 'angle-left', class: 'fa-solid fa-angle-left', type: 'solid' },
                { name: 'angle-right', class: 'fa-solid fa-angle-right', type: 'solid' },
                { name: 'angle-up', class: 'fa-solid fa-angle-up', type: 'solid' },
                { name: 'angle-down', class: 'fa-solid fa-angle-down', type: 'solid' },
                { name: 'angles-left', class: 'fa-solid fa-angles-left', type: 'solid' },
                { name: 'angles-right', class: 'fa-solid fa-angles-right', type: 'solid' },
                { name: 'angles-up', class: 'fa-solid fa-angles-up', type: 'solid' },
                { name: 'angles-down', class: 'fa-solid fa-angles-down', type: 'solid' },
                { name: 'plus', class: 'fa-solid fa-plus', type: 'solid' },
                { name: 'minus', class: 'fa-solid fa-minus', type: 'solid' },
                { name: 'times', class: 'fa-solid fa-times', type: 'solid' },
                { name: 'divide', class: 'fa-solid fa-divide', type: 'solid' },
                { name: 'equals', class: 'fa-solid fa-equals', type: 'solid' },
                { name: 'hashtag', class: 'fa-solid fa-hashtag', type: 'solid' },
                { name: 'at', class: 'fa-solid fa-at', type: 'solid' },
                { name: 'dollar-sign-alt', class: 'fa-solid fa-dollar-sign-alt', type: 'solid' },
                { name: 'yen-sign-alt', class: 'fa-solid fa-yen-sign-alt', type: 'solid' },
                { name: 'euro-sign-alt', class: 'fa-solid fa-euro-sign-alt', type: 'solid' },
                { name: 'pound-sign-alt', class: 'fa-solid fa-pound-sign-alt', type: 'solid' },
                { name: 'won-sign', class: 'fa-solid fa-won-sign', type: 'solid' },
                { name: 'lira-sign', class: 'fa-solid fa-lira-sign', type: 'solid' },
                { name: 'ruble-sign', class: 'fa-solid fa-ruble-sign', type: 'solid' },
                { name: 'shekel-sign', class: 'fa-solid fa-shekel-sign', type: 'solid' },
                { name: 'turkish-lira-sign', class: 'fa-solid fa-turkish-lira-sign', type: 'solid' },
                { name: 'indian-rupee-sign', class: 'fa-solid fa-indian-rupee-sign', type: 'solid' },
                { name: 'align-left', class: 'fa-solid fa-align-left', type: 'solid' },
                { name: 'align-center', class: 'fa-solid fa-align-center', type: 'solid' },
                { name: 'align-right', class: 'fa-solid fa-align-right', type: 'solid' },
                { name: 'align-justify', class: 'fa-solid fa-align-justify', type: 'solid' },
                { name: 'list', class: 'fa-solid fa-list', type: 'solid' },
                { name: 'list-ul', class: 'fa-solid fa-list-ul', type: 'solid' },
                { name: 'list-ol', class: 'fa-solid fa-list-ol', type: 'solid' },
                { name: 'indent', class: 'fa-solid fa-indent', type: 'solid' },
                { name: 'outdent', class: 'fa-solid fa-outdent', type: 'solid' },
                { name: 'bold', class: 'fa-solid fa-bold', type: 'solid' },
                { name: 'italic', class: 'fa-solid fa-italic', type: 'solid' },
                { name: 'underline', class: 'fa-solid fa-underline', type: 'solid' },
                { name: 'strikethrough', class: 'fa-solid fa-strikethrough', type: 'solid' },
                { name: 'font', class: 'fa-solid fa-font', type: 'solid' },
                { name: 'heading', class: 'fa-solid fa-heading', type: 'solid' },
                { name: 'paragraph', class: 'fa-solid fa-paragraph', type: 'solid' },
                { name: 'file-csv', class: 'fa-solid fa-file-csv', type: 'solid' },
                { name: 'file-excel', class: 'fa-solid fa-file-excel', type: 'solid' },
                { name: 'file-image', class: 'fa-solid fa-file-image', type: 'solid' },
                { name: 'file-pdf', class: 'fa-solid fa-file-pdf', type: 'solid' },
                { name: 'file-powerpoint', class: 'fa-solid fa-file-powerpoint', type: 'solid' },
                { name: 'file-word', class: 'fa-solid fa-file-word', type: 'solid' },
                { name: 'file-code', class: 'fa-solid fa-file-code', type: 'solid' },
                { name: 'file-audio', class: 'fa-solid fa-file-audio', type: 'solid' },
                { name: 'file-video', class: 'fa-solid fa-file-video', type: 'solid' },
                { name: 'file-archive', class: 'fa-solid fa-file-archive', type: 'solid' },
                { name: 'calculator', class: 'fa-solid fa-calculator', type: 'solid' },
                { name: 'brush', class: 'fa-solid fa-brush', type: 'solid' },
                { name: 'ruler', class: 'fa-solid fa-ruler', type: 'solid' },
                { name: 'pencil-ruler', class: 'fa-solid fa-pencil-ruler', type: 'solid' },
                { name: 'crop', class: 'fa-solid fa-crop', type: 'solid' },
                { name: 'crop-alt', class: 'fa-solid fa-crop-alt', type: 'solid' },
                { name: 'sliders-h', class: 'fa-solid fa-sliders-h', type: 'solid' },
                { name: 'filter', class: 'fa-solid fa-filter', type: 'solid' },
                { name: 'trash-alt', class: 'fa-solid fa-trash-alt', type: 'solid' },
                { name: 'redo', class: 'fa-solid fa-redo', type: 'solid' },
                { name: 'undo', class: 'fa-solid fa-undo', type: 'solid' },
                { name: 'history', class: 'fa-solid fa-history', type: 'solid' },
                { name: 'sync-alt', class: 'fa-solid fa-sync-alt', type: 'solid' },
                { name: 'power-off', class: 'fa-solid fa-power-off', type: 'solid' },
                { name: 'toggle-on', class: 'fa-solid fa-toggle-on', type: 'solid' },
                { name: 'toggle-off', class: 'fa-solid fa-toggle-off', type: 'solid' },
                { name: 'qrcode', class: 'fa-solid fa-qrcode', type: 'solid' },
                { name: 'barcode', class: 'fa-solid fa-barcode', type: 'solid' },
                { name: 'id-badge', class: 'fa-solid fa-id-badge', type: 'solid' },
                { name: 'credit-card-alt', class: 'fa-solid fa-credit-card-alt', type: 'solid' },
                { name: 'receipt', class: 'fa-solid fa-receipt', type: 'solid' },
                { name: 'hand-holding-dollar', class: 'fa-solid fa-hand-holding-dollar', type: 'solid' },
                { name: 'piggy-bank', class: 'fa-solid fa-piggy-bank', type: 'solid' },
                { name: 'chart-bar', class: 'fa-solid fa-chart-bar', type: 'solid' },
                { name: 'chart-area', class: 'fa-solid fa-chart-area', type: 'solid' },
                { name: 'table', class: 'fa-solid fa-table', type: 'solid' },
                { name: 'th', class: 'fa-solid fa-th', type: 'solid' },
                { name: 'th-list', class: 'fa-solid fa-th-list', type: 'solid' },
                { name: 'th-large', class: 'fa-solid fa-th-large', type: 'solid' },
                { name: 'columns', class: 'fa-solid fa-columns', type: 'solid' },
                { name: 'tasks', class: 'fa-solid fa-tasks', type: 'solid' },
                { name: 'clipboard-list', class: 'fa-solid fa-clipboard-list', type: 'solid' },
                { name: 'check-double', class: 'fa-solid fa-check-double', type: 'solid' },
                { name: 'clipboard-check', class: 'fa-solid fa-clipboard-check', type: 'solid' },
                { name: 'balance-scale', class: 'fa-solid fa-balance-scale', type: 'solid' },
                { name: 'handshake-alt', class: 'fa-solid fa-handshake-alt', type: 'solid' },
                { name: 'user-alt', class: 'fa-solid fa-user-alt', type: 'solid' },
                { name: 'user-circle', class: 'fa-solid fa-user-circle', type: 'solid' },
                { name: 'user-plus', class: 'fa-solid fa-user-plus', type: 'solid' },
                { name: 'user-minus', class: 'fa-solid fa-user-minus', type: 'solid' },
                { name: 'user-friends', class: 'fa-solid fa-user-friends', type: 'solid' },
                { name: 'user-lock', class: 'fa-solid fa-user-lock', type: 'solid' },
                { name: 'user-shield', class: 'fa-solid fa-user-shield', type: 'solid' },
                { name: 'users', class: 'fa-solid fa-users', type: 'solid' },
                { name: 'user-cog', class: 'fa-solid fa-user-cog', type: 'solid' },
                { name: 'user-edit', class: 'fa-solid fa-user-edit', type: 'solid' },
                { name: 'user-times', class: 'fa-solid fa-user-times', type: 'solid' },
                { name: 'hospital-user', class: 'fa-solid fa-hospital-user', type: 'solid' },
                { name: 'medkit', class: 'fa-solid fa-medkit', type: 'solid' },
                { name: 'procedures', class: 'fa-solid fa-procedures', type: 'solid' },
                { name: 'tooth', class: 'fa-solid fa-tooth', type: 'solid' },
                { name: 'head-side-mask', class: 'fa-solid fa-head-side-mask', type: 'solid' },
                { name: 'virus', class: 'fa-solid fa-virus', type: 'solid' },
                { name: 'viruses', class: 'fa-solid fa-viruses', type: 'solid' },
                { name: 'bacteria', class: 'fa-solid fa-bacteria', type: 'solid' },
                { name: 'lungs', class: 'fa-solid fa-lungs', type: 'solid' },
                { name: 'x-ray', class: 'fa-solid fa-x-ray', type: 'solid' },
                { name: 'prescription-bottle-alt', class: 'fa-solid fa-prescription-bottle-alt', type: 'solid' },
                { name: 'file-medical', class: 'fa-solid fa-file-medical', type: 'solid' },
                { name: 'book-medical', class: 'fa-solid fa-book-medical', type: 'solid' },
                { name: 'clinic-medical', class: 'fa-solid fa-clinic-medical', type: 'solid' },
                { name: 'hand-holding-medical', class: 'fa-solid fa-hand-holding-medical', type: 'solid' },
                { name: 'diagnoses', class: 'fa-solid fa-diagnoses', type: 'solid' },
                { name: 'radiation', class: 'fa-solid fa-radiation', type: 'solid' },
                { name: 'radiation-alt', class: 'fa-solid fa-radiation-alt', type: 'solid' },
                { name: 'toilet', class: 'fa-solid fa-toilet', type: 'solid' },
                { name: 'bath', class: 'fa-solid fa-bath', type: 'solid' },
                { name: 'shower', class: 'fa-solid fa-shower', type: 'solid' },
                { name: 'faucet', class: 'fa-solid fa-faucet', type: 'solid' },
                { name: 'sink', class: 'fa-solid fa-sink', type: 'solid' },
                { name: 'soap', class: 'fa-solid fa-soap', type: 'solid' },
                { name: 'lungs-virus', class: 'fa-solid fa-lungs-virus', type: 'solid' },
                { name: 'hand-washing', class: 'fa-solid fa-hand-washing', type: 'solid' },
                { name: 'globe-americas', class: 'fa-solid fa-globe-americas', type: 'solid' },
                { name: 'globe-asia', class: 'fa-solid fa-globe-asia', type: 'solid' },
                { name: 'globe-europe', class: 'fa-solid fa-globe-europe', type: 'solid' },
                { name: 'city', class: 'fa-solid fa-city', type: 'solid' },
                { name: 'building', class: 'fa-solid fa-building', type: 'solid' },
                { name: 'industry', class: 'fa-solid fa-industry', type: 'solid' },
                { name: 'factory', class: 'fa-solid fa-factory', type: 'solid' },
                { name: 'warehouse', class: 'fa-solid fa-warehouse', type: 'solid' },
                { name: 'truck-loading', class: 'fa-solid fa-truck-loading', type: 'solid' },
                { name: 'truck-moving', class: 'fa-solid fa-truck-moving', type: 'solid' },
                { name: 'shipping-fast', class: 'fa-solid fa-shipping-fast', type: 'solid' },
                { name: 'box-open', class: 'fa-solid fa-box-open', type: 'solid' },
                { name: 'boxes-stacked', class: 'fa-solid fa-boxes-stacked', type: 'solid' },
                { name: 'pallet', class: 'fa-solid fa-pallet', type: 'solid' },
                { name: 'dolly', class: 'fa-solid fa-dolly', type: 'solid' },
                { name: 'container-storage', class: 'fa-solid fa-container-storage', type: 'solid' },
                { name: 'trailer', class: 'fa-solid fa-trailer', type: 'solid' },
                { name: 'road-barrier', class: 'fa-solid fa-road-barrier', type: 'solid' },
                { name: 'gas-pump-slash', class: 'fa-solid fa-gas-pump-slash', type: 'solid' },
                { name: 'recycle', class: 'fa-solid fa-recycle', type: 'solid' },
                { name: 'dumpster', class: 'fa-solid fa-dumpster', type: 'solid' },
                { name: 'dumpster-fire', class: 'fa-solid fa-dumpster-fire', type: 'solid' },
                { name: 'poop', class: 'fa-solid fa-poop', type: 'solid' },
                { name: 'toilet-paper', class: 'fa-solid fa-toilet-paper', type: 'solid' },
                { name: 'faucet-drip', class: 'fa-solid fa-faucet-drip', type: 'solid' },
                { name: 'hand-holding-droplet', class: 'fa-solid fa-hand-holding-droplet', type: 'solid' },
                { name: 'tint', class: 'fa-solid fa-tint', type: 'solid' },
                { name: 'droplet', class: 'fa-solid fa-droplet', type: 'solid' },
                { name: 'fire-alt', class: 'fa-solid fa-fire-alt', type: 'solid' },
                { name: 'fire-extinguisher', class: 'fa-solid fa-fire-extinguisher', type: 'solid' },
                { name: 'wind', class: 'fa-solid fa-wind', type: 'solid' },
                { name: 'smog', class: 'fa-solid fa-smog', type: 'solid' },
                { name: 'cloud-meatball', class: 'fa-solid fa-cloud-meatball', type: 'solid' },
                { name: 'cloud-sun-rain', class: 'fa-solid fa-cloud-sun-rain', type: 'solid' },
                { name: 'cloud-showers-heavy', class: 'fa-solid fa-cloud-showers-heavy', type: 'solid' },
                { name: 'rainbow', class: 'fa-solid fa-rainbow', type: 'solid' },
                { name: 'tornado', class: 'fa-solid fa-tornado', type: 'solid' },
                { name: 'volcano', class: 'fa-solid fa-volcano', type: 'solid' },
                { name: 'temperature-high', class: 'fa-solid fa-temperature-high', type: 'solid' },
                { name: 'temperature-low', class: 'fa-solid fa-temperature-low', type: 'solid' },
                { name: 'water-ladder', class: 'fa-solid fa-water-ladder', type: 'solid' },
                { name: 'person-swimming', class: 'fa-solid fa-person-swimming', type: 'solid' },
                { name: 'person-walking', class: 'fa-solid fa-person-walking', type: 'solid' },
                { name: 'person-running', class: 'fa-solid fa-person-running', type: 'solid' },
                { name: 'person-hiking', class: 'fa-solid fa-person-hiking', type: 'solid' },
                { name: 'person-skiing', class: 'fa-solid fa-person-skiing', type: 'solid' },
                { name: 'person-snowboarding', class: 'fa-solid fa-person-snowboarding', type: 'solid' },
                { name: 'person-walking-luggage', class: 'fa-solid fa-person-walking-luggage', type: 'solid' },
                { name: 'plane-departure', class: 'fa-solid fa-plane-departure', type: 'solid' },
                { name: 'plane-arrival', class: 'fa-solid fa-plane-arrival', type: 'solid' },
                { name: 'suitcase', class: 'fa-solid fa-suitcase', type: 'solid' },
                { name: 'suitcase-rolling', class: 'fa-solid fa-suitcase-rolling', type: 'solid' },
                { name: 'bed', class: 'fa-solid fa-bed', type: 'solid' },
                { name: 'hotel', class: 'fa-solid fa-hotel', type: 'solid' },
                { name: 'calendar-check', class: 'fa-solid fa-calendar-check', type: 'solid' },
                { name: 'calendar-xmark', class: 'fa-solid fa-calendar-xmark', type: 'solid' },
                { name: 'calendar-plus', class: 'fa-solid fa-calendar-plus', type: 'solid' },
                { name: 'calendar-minus', class: 'fa-solid fa-calendar-minus', type: 'solid' },
                { name: 'hourglass-start', class: 'fa-solid fa-hourglass-start', type: 'solid' },
                { name: 'hourglass-half', class: 'fa-solid fa-hourglass-half', type: 'solid' },
                { name: 'hourglass-end', class: 'fa-solid fa-hourglass-end', type: 'solid' },
                { name: 'stopwatch', class: 'fa-solid fa-stopwatch', type: 'solid' },
                { name: 'stopwatch-20', class: 'fa-solid fa-stopwatch-20', type: 'solid' },
                { name: 'play', class: 'fa-solid fa-play', type: 'solid' },
                { name: 'pause', class: 'fa-solid fa-pause', type: 'solid' },
                { name: 'stop', class: 'fa-solid fa-stop', type: 'solid' },
                { name: 'forward', class: 'fa-solid fa-forward', type: 'solid' },
                { name: 'backward', class: 'fa-solid fa-backward', type: 'solid' },
                { name: 'fast-forward', class: 'fa-solid fa-fast-forward', type: 'solid' },
                { name: 'fast-backward', class: 'fa-solid fa-fast-backward', type: 'solid' },
                { name: 'step-forward', class: 'fa-solid fa-step-forward', type: 'solid' },
                { name: 'step-backward', class: 'fa-solid fa-step-backward', type: 'solid' },
                { name: 'eject', class: 'fa-solid fa-eject', type: 'solid' },
                { name: 'headphones', class: 'fa-solid fa-headphones', type: 'solid' },
                { name: 'microphone-slash', class: 'fa-solid fa-microphone-slash', type: 'solid' },
                { name: 'volume-off', class: 'fa-solid fa-volume-off', type: 'solid' },
                { name: 'podcast', class: 'fa-solid fa-podcast', type: 'solid' },
                { name: 'broadcast-tower', class: 'fa-solid fa-broadcast-tower', type: 'solid' },
                { name: 'signal', class: 'fa-solid fa-signal', type: 'solid' },
                { name: 'rss', class: 'fa-solid fa-rss', type: 'solid' },
                { name: 'wifi-slash', class: 'fa-solid fa-wifi-slash', type: 'solid' },
                { name: 'plug', class: 'fa-solid fa-plug', type: 'solid' },
                { name: 'battery-empty', class: 'fa-solid fa-battery-empty', type: 'solid' },
                { name: 'battery-half', class: 'fa-solid fa-battery-half', type: 'solid' },
                { name: 'battery-quarter', class: 'fa-solid fa-battery-quarter', type: 'solid' },
                { name: 'battery-three-quarters', class: 'fa-solid fa-battery-three-quarters', type: 'solid' },
                { name: 'charging-station', class: 'fa-solid fa-charging-station', type: 'solid' },
                { name: 'splotch', class: 'fa-solid fa-splotch', type: 'solid' },
                { name: 'brush-alt', class: 'fa-solid fa-brush-alt', type: 'solid' },
                { name: 'ruler-combined', class: 'fa-solid fa-ruler-combined', type: 'solid' },
                { name: 'eraser', class: 'fa-solid fa-eraser', type: 'solid' },
                { name: 'pen', class: 'fa-solid fa-pen', type: 'solid' },
                { name: 'pen-square', class: 'fa-solid fa-pen-square', type: 'solid' },
                { name: 'pencil-alt', class: 'fa-solid fa-pencil-alt', type: 'solid' },
                { name: 'comment-alt', class: 'fa-solid fa-comment-alt', type: 'solid' },
                { name: 'comment-dots', class: 'fa-solid fa-comment-dots', type: 'solid' },
                { name: 'comment-slash', class: 'fa-solid fa-comment-slash', type: 'solid' },
                { name: 'paper-plane', class: 'fa-solid fa-paper-plane', type: 'solid' },
                { name: 'share', class: 'fa-solid fa-share', type: 'solid' },
                { name: 'retweet', class: 'fa-solid fa-retweet', type: 'solid' },
                { name: 'inbox', class: 'fa-solid fa-inbox', type: 'solid' },
                { name: 'box-archive', class: 'fa-solid fa-box-archive', type: 'solid' },
                { name: 'sticky-note', class: 'fa-solid fa-sticky-note', type: 'solid' },
                { name: 'file-invoice', class: 'fa-solid fa-file-invoice', type: 'solid' },
                { name: 'file-invoice-dollar', class: 'fa-solid fa-file-invoice-dollar', type: 'solid' },
                { name: 'users-cog', class: 'fa-solid fa-users-cog', type: 'solid' },
                { name: 'user-secret', class: 'fa-solid fa-user-secret', type: 'solid' },
                { name: 'user-astronaut', class: 'fa-solid fa-user-astronaut', type: 'solid' },
                { name: 'user-graduate', class: 'fa-solid fa-user-graduate', type: 'solid' },
                { name: 'user-tie', class: 'fa-solid fa-user-tie', type: 'solid' },
                { name: 'people-carry-box', class: 'fa-solid fa-people-carry-box', type: 'solid' },
                { name: 'person-carry-box', class: 'fa-solid fa-person-carry-box', type: 'solid' },
                { name: 'baby', class: 'fa-solid fa-baby', type: 'solid' },
                { name: 'child', class: 'fa-solid fa-child', type: 'solid' },
                { name: 'cat', class: 'fa-solid fa-cat', type: 'solid' },
                { name: 'dog', class: 'fa-solid fa-dog', type: 'solid' },
                { name: 'paw', class: 'fa-solid fa-paw', type: 'solid' },
                { name: 'fish', class: 'fa-solid fa-fish', type: 'solid' },
                { name: 'spider', class: 'fa-solid fa-spider', type: 'solid' },
                { name: 'bug-slash', class: 'fa-solid fa-bug-slash', type: 'solid' },
                { name: 'virus-slash', class: 'fa-solid fa-virus-slash', type: 'solid' },
                { name: 'disease', class: 'fa-solid fa-disease', type: 'solid' },
                { name: 'head-side-cough', class: 'fa-solid fa-head-side-cough', type: 'solid' },
                { name: 'temperature-full', class: 'fa-solid fa-temperature-full', type: 'solid' },
                { name: 'temperature-empty', class: 'fa-solid fa-temperature-empty', type: 'solid' },
                { name: 'thermometer', class: 'fa-solid fa-thermometer', type: 'solid' },
                { name: 'weight-hanging', class: 'fa-solid fa-weight-hanging', type: 'solid' },
                { name: 'weight-scale', class: 'fa-solid fa-weight-scale', type: 'solid' },
                { name: 'ruler-vertical', class: 'fa-solid fa-ruler-vertical', type: 'solid' },
                { name: 'ruler-horizontal', class: 'fa-solid fa-ruler-horizontal', type: 'solid' },
                { name: 'compass-drafting', class: 'fa-solid fa-compass-drafting', type: 'solid' },
                { name: 'fill', class: 'fa-solid fa-fill', type: 'solid' },
                { name: 'droplet-slash', class: 'fa-solid fa-droplet-slash', type: 'solid' },
                { name: 'tint-slash', class: 'fa-solid fa-tint-slash', type: 'solid' },
                { name: 'meteor', class: 'fa-solid fa-meteor', type: 'solid' },
                { name: 'icicles', class: 'fa-solid fa-icicles', type: 'solid' },
                { name: 'person-drowning', class: 'fa-solid fa-person-drowning', type: 'solid' },
                { name: 'fire-burner', class: 'fa-solid fa-fire-burner', type: 'solid' },
                { name: 'bowl-food', class: 'fa-solid fa-bowl-food', type: 'solid' },
                { name: 'utensils', class: 'fa-solid fa-utensils', type: 'solid' },
                { name: 'cookie-bite', class: 'fa-solid fa-cookie-bite', type: 'solid' },
                { name: 'bread-slice', class: 'fa-solid fa-bread-slice', type: 'solid' },
                { name: 'cheese', class: 'fa-solid fa-cheese', type: 'solid' },
                { name: 'bacon', class: 'fa-solid fa-bacon', type: 'solid' },
                { name: 'hotdog', class: 'fa-solid fa-hotdog', type: 'solid' },
                { name: 'drumstick-bite', class: 'fa-solid fa-drumstick-bite', type: 'solid' },
                { name: 'mug-hot', class: 'fa-solid fa-mug-hot', type: 'solid' },
                { name: 'blender', class: 'fa-solid fa-blender', type: 'solid' },
                { name: 'mortar-pestle', class: 'fa-solid fa-mortar-pestle', type: 'solid' },
                { name: 'grill', class: 'fa-solid fa-grill', type: 'solid' },
                { name: 'shrimp', class: 'fa-solid fa-shrimp', type: 'solid' },
                { name: 'apple-alt', class: 'fa-solid fa-apple-alt', type: 'solid' },
                { name: 'lemon', class: 'fa-solid fa-lemon', type: 'solid' },
                { name: 'pepper-hot', class: 'fa-solid fa-pepper-hot', type: 'solid' },
                { name: 'tractor', class: 'fa-solid fa-tractor', type: 'solid' },
                { name: 'cow', class: 'fa-solid fa-cow', type: 'solid' },
                { name: 'horse', class: 'fa-solid fa-horse', type: 'solid' },
                { name: 'frog', class: 'fa-solid fa-frog', type: 'solid' },
                { name: 'dragon', class: 'fa-solid fa-dragon', type: 'solid' },
                { name: 'ghost', class: 'fa-solid fa-ghost', type: 'solid' },
                { name: 'skull', class: 'fa-solid fa-skull', type: 'solid' },
                { name: 'poo', class: 'fa-solid fa-poo', type: 'solid' },
                { name: 'toilet-paper-slash', class: 'fa-solid fa-toilet-paper-slash', type: 'solid' },
                { name: 'faucet-slash', class: 'fa-solid fa-faucet-slash', type: 'solid' },
                { name: 'pump-medical', class: 'fa-solid fa-pump-medical', type: 'solid' },
                { name: 'capsules', class: 'fa-solid fa-capsules', type: 'solid' },
                { name: 'prescription', class: 'fa-solid fa-prescription', type: 'solid' },
                { name: 'notes-medical', class: 'fa-solid fa-notes-medical', type: 'solid' },
                { name: 'file-prescription', class: 'fa-solid fa-file-prescription', type: 'solid' },
                { name: 'user-md', class: 'fa-solid fa-user-md', type: 'solid' },
                { name: 'tooth-alt', class: 'fa-solid fa-tooth-alt', type: 'solid' },
                { name: 'flask-vial', class: 'fa-solid fa-flask-vial', type: 'solid' },
                { name: 'hand-holding-heart', class: 'fa-solid fa-hand-holding-heart', type: 'solid' },
                { name: 'ribbon', class: 'fa-solid fa-ribbon', type: 'solid' },
                { name: 'dove', class: 'fa-solid fa-dove', type: 'solid' },
                { name: 'peace', class: 'fa-solid fa-peace', type: 'solid' },
                { name: 'hand-peace', class: 'fa-solid fa-hand-peace', type: 'solid' },
                { name: 'cross', class: 'fa-solid fa-cross', type: 'solid' },
                { name: 'star-of-david', class: 'fa-solid fa-star-of-david', type: 'solid' },
                { name: 'om', class: 'fa-solid fa-om', type: 'solid' },
                { name: 'mosque', class: 'fa-solid fa-mosque', type: 'solid' },
                { name: 'church', class: 'fa-solid fa-church', type: 'solid' },
                { name: 'quran', class: 'fa-solid fa-quran', type: 'solid' },
                { name: 'menorah', class: 'fa-solid fa-menorah', type: 'solid' },
                { name: 'synagogue', class: 'fa-solid fa-synagogue', type: 'solid' },
                { name: 'bahai', class: 'fa-solid fa-bahai', type: 'solid' },
                { name: 'yin-yang', class: 'fa-solid fa-yin-yang', type: 'solid' },
                { name: 'hands-praying', class: 'fa-solid fa-hands-praying', type: 'solid' },
                { name: 'ankh', class: 'fa-solid fa-ankh', type: 'solid' },
                { name: 'hanukiah', class: 'fa-solid fa-hanukiah', type: 'solid' },
                { name: 'place-of-worship', class: 'fa-solid fa-place-of-worship', type: 'solid' },
                { name: 'book-quran', class: 'fa-solid fa-book-quran', type: 'solid' },
                { name: 'gopuram', class: 'fa-solid fa-gopuram', type: 'solid' },
                { name: 'hamsa', class: 'fa-solid fa-hamsa', type: 'solid' },
                { name: 'khanda', class: 'fa-solid fa-khanda', type: 'solid' },
                { name: 'mandalorian', class: 'fa-brands fa-mandalorian', type: 'brand' },
                { name: 'galactic-republic', class: 'fa-brands fa-galactic-republic', type: 'brand' },
                { name: 'galactic-senate', class: 'fa-brands fa-galactic-senate', type: 'brand' },
                { name: 'jedi-order', class: 'fa-brands fa-jedi-order', type: 'brand' },
                { name: 'old-republic', class: 'fa-brands fa-old-republic', type: 'brand' },
                { name: 'sith', class: 'fa-brands fa-sith', type: 'brand' },
                { name: 'trade-federation', class: 'fa-brands fa-trade-federation', type: 'brand' },
                { name: 'rev', class: 'fa-brands fa-rev', type: 'brand' },
                { name: 'font-awesome', class: 'fa-brands fa-font-awesome', type: 'brand' },
                { name: 'font-awesome-alt', class: 'fa-brands fa-font-awesome-alt', type: 'brand' },
                { name: 'font-awesome-flag', class: 'fa-brands fa-font-awesome-flag', type: 'brand' },
                { name: 'font-awesome-logo-full', class: 'fa-brands fa-font-awesome-logo-full', type: 'brand' },
                { name: 'quora', class: 'fa-brands fa-quora', type: 'brand' },
                { name: 'weibo', class: 'fa-brands fa-weibo', type: 'brand' },
                { name: 'weixin', class: 'fa-brands fa-weixin', type: 'brand' },
                { name: 'qq', class: 'fa-brands fa-qq', type: 'brand' },
                { name: 'line', class: 'fa-brands fa-line', type: 'brand' },
                { name: 'telegram', class: 'fa-brands fa-telegram', type: 'brand' },
                { name: 'skype', class: 'fa-brands fa-skype', type: 'brand' },
                { name: 'tumblr-square', class: 'fa-brands fa-tumblr-square', type: 'brand' },
                { name: 'digg', class: 'fa-brands fa-digg', type: 'brand' },
                { name: 'stumbleupon', class: 'fa-brands fa-stumbleupon', type: 'brand' },
                { name: 'behance-square', class: 'fa-brands fa-behance-square', type: 'brand' },
                { name: 'dribbble-square', class: 'fa-brands fa-dribbble-square', type: 'brand' },
                { name: 'youtube-square', class: 'fa-brands fa-youtube-square', type: 'brand' },
                { name: 'twitter-square', class: 'fa-brands fa-twitter-square', type: 'brand' },
                { name: 'facebook-square', class: 'fa-brands fa-facebook-square', type: 'brand' },
                { name: 'linkedin-square', class: 'fa-brands fa-linkedin-square', type: 'brand' },
                { name: 'github-square', class: 'fa-brands fa-github-square', type: 'brand' },
                { name: 'instagram-square', class: 'fa-brands fa-instagram-square', type: 'brand' },
                { name: 'snapchat-square', class: 'fa-brands fa-snapchat-square', type: 'brand' },
                { name: 'pinterest-square', class: 'fa-brands fa-pinterest-square', type: 'brand' },
                { name: 'reddit-square', class: 'fa-brands fa-reddit-square', type: 'brand' },
                { name: 'lastfm-square', class: 'fa-brands fa-lastfm-square', type: 'brand' },
                { name: 'google-plus', class: 'fa-brands fa-google-plus', type: 'brand' },
                { name: 'google-plus-square', class: 'fa-brands fa-google-plus-square', type: 'brand' },
                { name: 'codepen', class: 'fa-brands fa-codepen', type: 'brand' }
            ];

            // Deduplicate and limit to 500 icons
            const uniqueIconsSet = new Set();
            const allIcons = [];
            for (const icon of rawIcons) {
                // Use the class name as the unique identifier
                if (!uniqueIconsSet.has(icon.class)) {
                    uniqueIconsSet.add(icon.class);
                    allIcons.push(icon);
                    if (allIcons.length >= 500) {
                        break; // Stop once 500 unique icons are collected
                    }
                }
            }


            // Function to display icons
            function displayIcons(iconsToDisplay) {
                searchResultsContainer.innerHTML = ''; // Clear previous results
                const searchTerm = iconSearchInput.value.toLowerCase();

                const filteredIcons = iconsToDisplay.filter(icon => {
                    const matchesSearch = icon.name.toLowerCase().includes(searchTerm);
                    const matchesFilter = currentFilter === 'all' || icon.type === currentFilter;
                    return matchesSearch && matchesFilter;
                });


                if (filteredIcons.length === 0) {
                    noResultsMessage.classList.remove('hidden');
                } else {
                    noResultsMessage.classList.add('hidden');
                    filteredIcons.forEach(icon => {
                        const iconCard = document.createElement('div');
                        iconCard.className = 'flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-36 h-48 justify-between hover:bg-gray-50 hover:shadow-lg transition-all duration-200';
                        // Determine a default color based on brand or a general color if not a brand icon for consistency
                        const iconColorClass = icon.type === 'brand' ? 'text-gray-800' : 'text-indigo-600';

                        iconCard.innerHTML = `
                            <i class="${icon.class} fa-3x ${iconColorClass} mb-2" data-original-class="${icon.class}"></i>
                            <p class="text-sm font-medium text-gray-700 text-center mb-2">${icon.name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                            <div class="flex space-x-2">
                                <button class="edit-btn bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        data-icon-class="${icon.class}"
                                        data-icon-color="${iconColorClass === 'text-gray-800' ? '#1f2937' : '#4f46e5'}">Edit</button>
                                <button class="copy-btn bg-indigo-500 text-white text-xs px-3 py-1 rounded-full hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300">Copy</button>
                            </div>
                        `;
                        searchResultsContainer.appendChild(iconCard);
                    });
                    addEventListeners(); // Re-add listeners for new buttons
                }
            }

            // Function to handle copy button clicks
            function copyToClipboard(text) {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = text;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                tempTextArea.setSelectionRange(0, 99999); // For mobile devices

                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Oops, unable to copy', err);
                    // Fallback for when execCommand fails (e.g., security restrictions in some environments)
                    // In a real app, you'd show a custom message box here.
                    alert('Could not copy code. Please manually copy: \n\n' + text);
                } finally {
                    document.body.removeChild(tempTextArea);
                }
            }

            // Function to open the edit modal
            function openEditModal(iconElement, initialColor) {
                currentIcon = iconElement; // Store the actual icon element
                modalIconPreview.innerHTML = ''; // Clear previous preview
                const clonedIcon = iconElement.cloneNode(true);
                // Remove existing size classes from clonedIcon if present, and set a base size for modal preview
                clonedIcon.classList.remove('fa-xs', 'fa-sm', 'fa-lg', 'fa-xl', 'fa-2xl', 'fa-1x', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x', 'fa-6x', 'fa-7x', 'fa-8x', 'fa-9x', 'fa-10x');
                clonedIcon.classList.add('fa-3x'); // Default size for modal preview

                // Remove existing color classes from clonedIcon
                const currentClasses = Array.from(clonedIcon.classList);
                currentClasses.forEach(cls => {
                    if (cls.startsWith('text-')) {
                        clonedIcon.classList.remove(cls);
                    }
                });

                clonedIcon.style.color = initialColor; // Apply initial color
                modalIconPreview.appendChild(clonedIcon);

                // Set initial values for controls based on current icon state
                // Get current size (fa-X) from the icon element's class list
                const currentSizeClass = Array.from(iconElement.classList).find(cls => cls.startsWith('fa-') && cls.includes('x'));
                iconSizeSelect.value = currentSizeClass || 'fa-3x'; // Default to fa-3x if no size class found

                iconColorInput.value = initialColor;

                editModal.style.display = 'flex'; // Show the modal
            }

            // Function to update icon preview in modal and the actual icon in grid
            function updateIconPreviewAndGrid() {
                if (!currentIcon) return;

                // Update modal preview
                const selectedSize = iconSizeSelect.value;
                const selectedColor = iconColorInput.value;

                // Update the icon in the modal preview
                const previewIcon = modalIconPreview.querySelector('i');
                if (previewIcon) {
                    // Remove all existing size classes
                    Array.from(previewIcon.classList).forEach(cls => {
                        if (cls.startsWith('fa-') && cls.includes('x')) {
                            previewIcon.classList.remove(cls);
                        }
                    });
                    previewIcon.classList.add(selectedSize); // Add selected size
                    previewIcon.style.color = selectedColor; // Apply selected color
                }

                // Update the actual icon in the grid
                // Remove all existing size and color classes from the grid icon
                Array.from(currentIcon.classList).forEach(cls => {
                    if (cls.startsWith('fa-') && cls.includes('x')) {
                        currentIcon.classList.remove(cls);
                    }
                    if (cls.startsWith('text-')) { // Remove Tailwind color classes
                        currentIcon.classList.remove(cls);
                    }
                });
                currentIcon.classList.add(selectedSize); // Apply new size
                currentIcon.style.color = selectedColor; // Apply new color as inline style

                // Store the current size and color on the actual icon for next edit session
                currentIcon.dataset.currentSize = selectedSize;
                currentIcon.dataset.currentColor = selectedColor;
            }

            // Event listener for changes in size and color controls within the modal
            iconSizeSelect.addEventListener('change', updateIconPreviewAndGrid);
            iconColorInput.addEventListener('input', updateIconPreviewAndGrid); // Use 'input' for real-time update

            // Event listener for Copy Edited Code button in modal
            copyEditedCodeBtn.addEventListener('click', function() {
                if (currentIcon) {
                    const originalClass = currentIcon.dataset.originalClass; // Get original classes like fa-solid fa-home
                    const selectedSize = iconSizeSelect.value;
                    const selectedColor = iconColorInput.value;

                    // Construct the new HTML code
                    let newIconCode = `<i class="${originalClass} ${selectedSize}" style="color: ${selectedColor};"></i>`;
                    copyToClipboard(newIconCode);

                    // Provide feedback to the user
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 1500);
                }
            });

            // Close modal functionality
            closeModalBtn.addEventListener('click', () => {
                editModal.style.display = 'none';
                currentIcon = null; // Clear current icon reference
            });

            window.addEventListener('click', (event) => {
                if (event.target == editModal) {
                    editModal.style.display = 'none';
                    currentIcon = null; // Clear current icon reference
                }
            });


            // Function to add event listeners to dynamically created buttons
            function addEventListeners() {
                searchResultsContainer.querySelectorAll('.copy-btn').forEach(button => {
                    button.onclick = function() {
                        const iconElement = this.closest('.flex-col').querySelector('i');
                        const originalClass = iconElement.dataset.originalClass;
                        const currentSize = iconElement.dataset.currentSize || 'fa-3x'; // Get current size or default
                        const currentColor = iconElement.dataset.currentColor || iconElement.style.color; // Get current color or inline style

                        let iconCode = `<i class="${originalClass} ${currentSize}"`;
                        if (currentColor && currentColor !== 'rgba(0, 0, 0, 0)') { // Check if color is set and not transparent black
                            iconCode += ` style="color: ${currentColor};"`;
                        }
                        iconCode += `></i>`;

                        copyToClipboard(iconCode);

                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 1500);
                    };
                });

                searchResultsContainer.querySelectorAll('.edit-btn').forEach(button => {
                    button.onclick = function() {
                        const iconElement = this.closest('.flex-col').querySelector('i');
                        // Initialize custom properties if they don't exist
                        if (!iconElement.dataset.currentSize) {
                            iconElement.dataset.currentSize = 'fa-3x'; // Default size
                        }
                        if (!iconElement.dataset.currentColor) {
                            // Derive initial color from Tailwind class or default
                            const computedStyle = window.getComputedStyle(iconElement);
                            iconElement.dataset.currentColor = computedStyle.color;
                        }
                        openEditModal(iconElement, iconElement.dataset.currentColor);
                    };
                });
            }

            // Event listener for search input
            iconSearchInput.addEventListener('input', function() {
                displayIcons(allIcons);
            });

            // Event listeners for filter radios
            filterRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    currentFilter = this.value;
                    displayIcons(allIcons);
                });
            });

            // Initial display of icons
            displayIcons(allIcons);
        });
