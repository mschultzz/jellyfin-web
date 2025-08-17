/**
 * Module for building cards from item data.
 * @module components/cardBuilder/cardBuilder
 */

import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import { PersonKind } from '@jellyfin/sdk/lib/generated-client/models/person-kind';
import escapeHtml from 'escape-html';

import browser from 'scripts/browser';
import datetime from 'scripts/datetime';
import dom from 'scripts/dom';
import globalize from 'lib/globalize';
import { getBackdropShape, getPortraitShape, getSquareShape } from 'utils/card';
import { getItemTypeIcon, getLibraryIcon } from 'utils/image';

import focusManager from '../focusManager';
import imageLoader from '../images/imageLoader';
import indicators from '../indicators/indicators';
import itemHelper from '../itemHelper';
import layoutManager from '../layoutManager';
import { playbackManager } from '../playback/playbackmanager';
import { appRouter } from '../router/appRouter';
import ServerConnections from '../ServerConnections';
import itemShortcuts from '../shortcuts';

import 'elements/emby-button/paper-icon-button-light';

import './card.scss';
import '../guide/programs.scss';
import {
    getDesiredAspect,
    getPostersPerRow,
    isResizable,
    isUsingLiveTvNaming,
    resolveAction,
    resolveCardBoxCssClasses,
    resolveCardImageContainerCssClasses,
    resolveMixedShapeByAspectRatio
} from './cardBuilderUtils';

const enableFocusTransform = !browser.slow && !browser.edge;

/* -----------------------------------------------------------
   a ton of helper functions here (unchanged)...
   ----------------------------------------------------------- */

/**
 * Update userData on card (progress bars, indicators, etc.)
 * Netflix-style tweak: removed playedIndicator completely
 */
function upda
