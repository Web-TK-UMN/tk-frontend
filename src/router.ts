// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/cms`
  | `/cms/category/:categorySlug/:itemSlug`
  | `/cms/login`

export type Params = {
  '/cms/category/:categorySlug/:itemSlug': { categorySlug: string; itemSlug: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
