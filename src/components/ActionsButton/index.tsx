import React, { FC, forwardRef } from 'react';

import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuMoreVertical } from 'react-icons/lu';

export type ActionsButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  label?: string;
};

export const ActionsButton: FC<React.PropsWithChildren<ActionsButtonProps>> =
  forwardRef(({ label, ...rest }, ref) => {
    const { t } = useTranslation(['components']);
    return (
      <IconButton
        // @ts-expect-error
        ref={ref}
        display="inline-flex"
        borderRadius="full"
        variant="ghost"
        color="inherit"
        colorScheme="gray"
        bg="transparent"
        opacity="0.5"
        _hover={{ opacity: 1, bg: 'rgba(0, 0, 0, 0.05)' }}
        _focusVisible={{ opacity: 1, boxShadow: 'outline' }}
        _active={{ bg: 'rgba(0, 0, 0, 0.1)' }}
        aria-label={label ?? t('components:actionsButton.label')}
        {...rest}
      >
        <LuMoreVertical />
      </IconButton>
    );
  });

ActionsButton.displayName = 'ActionsButton';
