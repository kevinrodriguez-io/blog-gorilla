/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = ({ lang }) => {
  const router = useRouter();
  let altLang = '';
  if (router.query.lang) {
    const { lang } = router.query;
    altLang = lang === 'en' ? 'es' : 'en';
  } else {
    altLang = 'es';
  }
  return (
    <nav>
      <ul>
        <li>
          <Link href="/[lang]/" as={`/${lang}/`}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/[lang]/" as={`/${altLang}/`}>
            <a>{altLang === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}</a>
          </Link>
        </li>
        <ul>
          {links.map(({ key, href, label }) => (
            <li key={key}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </ul>
      <style jsx>{`
        nav {
          text-align: center;
          position: absolute;
          width: 100%;
          z-index: 1;
        }
        ul {
          display: flex;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: var(--flat-white-light);
          text-decoration: none;
          font-size: 13px;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
