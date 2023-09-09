import { createContext, ComponentProps, render } from 'preact';
import { useContext, useEffect, useId, useRef, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';

// Re-export Preact hooks and components
// Create anti-corruption layer for easier switch between Preact and React
export {
  createContext,
  createPortal,
  ComponentProps,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  render,
};
