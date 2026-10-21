"""Describe a raw material.  Usage: python material.py bergamot"""
import sys
from perfume_api import get, show

show(get(f"materials/{sys.argv[1] if len(sys.argv) > 1 else 'bergamot'}"))
